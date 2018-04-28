package ie.gmit.bem.web.rest;

import ie.gmit.bem.LastminuteApp;

import ie.gmit.bem.domain.LastMinuteSevice;
import ie.gmit.bem.repository.LastMinuteSeviceRepository;
import ie.gmit.bem.repository.search.LastMinuteSeviceSearchRepository;
import ie.gmit.bem.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static ie.gmit.bem.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the LastMinuteSeviceResource REST controller.
 *
 * @see LastMinuteSeviceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LastminuteApp.class)
public class LastMinuteSeviceResourceIntTest {

    @Autowired
    private LastMinuteSeviceRepository lastMinuteSeviceRepository;

    @Autowired
    private LastMinuteSeviceSearchRepository lastMinuteSeviceSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLastMinuteSeviceMockMvc;

    private LastMinuteSevice lastMinuteSevice;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LastMinuteSeviceResource lastMinuteSeviceResource = new LastMinuteSeviceResource(lastMinuteSeviceRepository, lastMinuteSeviceSearchRepository);
        this.restLastMinuteSeviceMockMvc = MockMvcBuilders.standaloneSetup(lastMinuteSeviceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LastMinuteSevice createEntity(EntityManager em) {
        LastMinuteSevice lastMinuteSevice = new LastMinuteSevice();
        return lastMinuteSevice;
    }

    @Before
    public void initTest() {
        lastMinuteSeviceSearchRepository.deleteAll();
        lastMinuteSevice = createEntity(em);
    }

    @Test
    @Transactional
    public void createLastMinuteSevice() throws Exception {
        int databaseSizeBeforeCreate = lastMinuteSeviceRepository.findAll().size();

        // Create the LastMinuteSevice
        restLastMinuteSeviceMockMvc.perform(post("/api/last-minute-sevices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lastMinuteSevice)))
            .andExpect(status().isCreated());

        // Validate the LastMinuteSevice in the database
        List<LastMinuteSevice> lastMinuteSeviceList = lastMinuteSeviceRepository.findAll();
        assertThat(lastMinuteSeviceList).hasSize(databaseSizeBeforeCreate + 1);
        LastMinuteSevice testLastMinuteSevice = lastMinuteSeviceList.get(lastMinuteSeviceList.size() - 1);

        // Validate the LastMinuteSevice in Elasticsearch
        LastMinuteSevice lastMinuteSeviceEs = lastMinuteSeviceSearchRepository.findOne(testLastMinuteSevice.getId());
        assertThat(lastMinuteSeviceEs).isEqualToIgnoringGivenFields(testLastMinuteSevice);
    }

    @Test
    @Transactional
    public void createLastMinuteSeviceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lastMinuteSeviceRepository.findAll().size();

        // Create the LastMinuteSevice with an existing ID
        lastMinuteSevice.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLastMinuteSeviceMockMvc.perform(post("/api/last-minute-sevices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lastMinuteSevice)))
            .andExpect(status().isBadRequest());

        // Validate the LastMinuteSevice in the database
        List<LastMinuteSevice> lastMinuteSeviceList = lastMinuteSeviceRepository.findAll();
        assertThat(lastMinuteSeviceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLastMinuteSevices() throws Exception {
        // Initialize the database
        lastMinuteSeviceRepository.saveAndFlush(lastMinuteSevice);

        // Get all the lastMinuteSeviceList
        restLastMinuteSeviceMockMvc.perform(get("/api/last-minute-sevices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lastMinuteSevice.getId().intValue())));
    }

    @Test
    @Transactional
    public void getLastMinuteSevice() throws Exception {
        // Initialize the database
        lastMinuteSeviceRepository.saveAndFlush(lastMinuteSevice);

        // Get the lastMinuteSevice
        restLastMinuteSeviceMockMvc.perform(get("/api/last-minute-sevices/{id}", lastMinuteSevice.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lastMinuteSevice.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingLastMinuteSevice() throws Exception {
        // Get the lastMinuteSevice
        restLastMinuteSeviceMockMvc.perform(get("/api/last-minute-sevices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLastMinuteSevice() throws Exception {
        // Initialize the database
        lastMinuteSeviceRepository.saveAndFlush(lastMinuteSevice);
        lastMinuteSeviceSearchRepository.save(lastMinuteSevice);
        int databaseSizeBeforeUpdate = lastMinuteSeviceRepository.findAll().size();

        // Update the lastMinuteSevice
        LastMinuteSevice updatedLastMinuteSevice = lastMinuteSeviceRepository.findOne(lastMinuteSevice.getId());
        // Disconnect from session so that the updates on updatedLastMinuteSevice are not directly saved in db
        em.detach(updatedLastMinuteSevice);

        restLastMinuteSeviceMockMvc.perform(put("/api/last-minute-sevices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLastMinuteSevice)))
            .andExpect(status().isOk());

        // Validate the LastMinuteSevice in the database
        List<LastMinuteSevice> lastMinuteSeviceList = lastMinuteSeviceRepository.findAll();
        assertThat(lastMinuteSeviceList).hasSize(databaseSizeBeforeUpdate);
        LastMinuteSevice testLastMinuteSevice = lastMinuteSeviceList.get(lastMinuteSeviceList.size() - 1);

        // Validate the LastMinuteSevice in Elasticsearch
        LastMinuteSevice lastMinuteSeviceEs = lastMinuteSeviceSearchRepository.findOne(testLastMinuteSevice.getId());
        assertThat(lastMinuteSeviceEs).isEqualToIgnoringGivenFields(testLastMinuteSevice);
    }

    @Test
    @Transactional
    public void updateNonExistingLastMinuteSevice() throws Exception {
        int databaseSizeBeforeUpdate = lastMinuteSeviceRepository.findAll().size();

        // Create the LastMinuteSevice

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLastMinuteSeviceMockMvc.perform(put("/api/last-minute-sevices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lastMinuteSevice)))
            .andExpect(status().isCreated());

        // Validate the LastMinuteSevice in the database
        List<LastMinuteSevice> lastMinuteSeviceList = lastMinuteSeviceRepository.findAll();
        assertThat(lastMinuteSeviceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLastMinuteSevice() throws Exception {
        // Initialize the database
        lastMinuteSeviceRepository.saveAndFlush(lastMinuteSevice);
        lastMinuteSeviceSearchRepository.save(lastMinuteSevice);
        int databaseSizeBeforeDelete = lastMinuteSeviceRepository.findAll().size();

        // Get the lastMinuteSevice
        restLastMinuteSeviceMockMvc.perform(delete("/api/last-minute-sevices/{id}", lastMinuteSevice.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean lastMinuteSeviceExistsInEs = lastMinuteSeviceSearchRepository.exists(lastMinuteSevice.getId());
        assertThat(lastMinuteSeviceExistsInEs).isFalse();

        // Validate the database is empty
        List<LastMinuteSevice> lastMinuteSeviceList = lastMinuteSeviceRepository.findAll();
        assertThat(lastMinuteSeviceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchLastMinuteSevice() throws Exception {
        // Initialize the database
        lastMinuteSeviceRepository.saveAndFlush(lastMinuteSevice);
        lastMinuteSeviceSearchRepository.save(lastMinuteSevice);

        // Search the lastMinuteSevice
        restLastMinuteSeviceMockMvc.perform(get("/api/_search/last-minute-sevices?query=id:" + lastMinuteSevice.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lastMinuteSevice.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LastMinuteSevice.class);
        LastMinuteSevice lastMinuteSevice1 = new LastMinuteSevice();
        lastMinuteSevice1.setId(1L);
        LastMinuteSevice lastMinuteSevice2 = new LastMinuteSevice();
        lastMinuteSevice2.setId(lastMinuteSevice1.getId());
        assertThat(lastMinuteSevice1).isEqualTo(lastMinuteSevice2);
        lastMinuteSevice2.setId(2L);
        assertThat(lastMinuteSevice1).isNotEqualTo(lastMinuteSevice2);
        lastMinuteSevice1.setId(null);
        assertThat(lastMinuteSevice1).isNotEqualTo(lastMinuteSevice2);
    }
}
