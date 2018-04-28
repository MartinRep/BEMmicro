package ie.gmit.bem.web.rest;

import ie.gmit.bem.LastminuteApp;

import ie.gmit.bem.domain.LastMinuteOffer;
import ie.gmit.bem.repository.LastMinuteOfferRepository;
import ie.gmit.bem.repository.search.LastMinuteOfferSearchRepository;
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
 * Test class for the LastMinuteOfferResource REST controller.
 *
 * @see LastMinuteOfferResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LastminuteApp.class)
public class LastMinuteOfferResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PROFILE = "AAAAAAAAAA";
    private static final String UPDATED_PROFILE = "BBBBBBBBBB";

    @Autowired
    private LastMinuteOfferRepository lastMinuteOfferRepository;

    @Autowired
    private LastMinuteOfferSearchRepository lastMinuteOfferSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLastMinuteOfferMockMvc;

    private LastMinuteOffer lastMinuteOffer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LastMinuteOfferResource lastMinuteOfferResource = new LastMinuteOfferResource(lastMinuteOfferRepository, lastMinuteOfferSearchRepository);
        this.restLastMinuteOfferMockMvc = MockMvcBuilders.standaloneSetup(lastMinuteOfferResource)
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
    public static LastMinuteOffer createEntity(EntityManager em) {
        LastMinuteOffer lastMinuteOffer = new LastMinuteOffer()
            .name(DEFAULT_NAME)
            .profile(DEFAULT_PROFILE);
        return lastMinuteOffer;
    }

    @Before
    public void initTest() {
        lastMinuteOfferSearchRepository.deleteAll();
        lastMinuteOffer = createEntity(em);
    }

    @Test
    @Transactional
    public void createLastMinuteOffer() throws Exception {
        int databaseSizeBeforeCreate = lastMinuteOfferRepository.findAll().size();

        // Create the LastMinuteOffer
        restLastMinuteOfferMockMvc.perform(post("/api/last-minute-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lastMinuteOffer)))
            .andExpect(status().isCreated());

        // Validate the LastMinuteOffer in the database
        List<LastMinuteOffer> lastMinuteOfferList = lastMinuteOfferRepository.findAll();
        assertThat(lastMinuteOfferList).hasSize(databaseSizeBeforeCreate + 1);
        LastMinuteOffer testLastMinuteOffer = lastMinuteOfferList.get(lastMinuteOfferList.size() - 1);
        assertThat(testLastMinuteOffer.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLastMinuteOffer.getProfile()).isEqualTo(DEFAULT_PROFILE);

        // Validate the LastMinuteOffer in Elasticsearch
        LastMinuteOffer lastMinuteOfferEs = lastMinuteOfferSearchRepository.findOne(testLastMinuteOffer.getId());
        assertThat(lastMinuteOfferEs).isEqualToIgnoringGivenFields(testLastMinuteOffer);
    }

    @Test
    @Transactional
    public void createLastMinuteOfferWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lastMinuteOfferRepository.findAll().size();

        // Create the LastMinuteOffer with an existing ID
        lastMinuteOffer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLastMinuteOfferMockMvc.perform(post("/api/last-minute-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lastMinuteOffer)))
            .andExpect(status().isBadRequest());

        // Validate the LastMinuteOffer in the database
        List<LastMinuteOffer> lastMinuteOfferList = lastMinuteOfferRepository.findAll();
        assertThat(lastMinuteOfferList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLastMinuteOffers() throws Exception {
        // Initialize the database
        lastMinuteOfferRepository.saveAndFlush(lastMinuteOffer);

        // Get all the lastMinuteOfferList
        restLastMinuteOfferMockMvc.perform(get("/api/last-minute-offers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lastMinuteOffer.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].profile").value(hasItem(DEFAULT_PROFILE.toString())));
    }

    @Test
    @Transactional
    public void getLastMinuteOffer() throws Exception {
        // Initialize the database
        lastMinuteOfferRepository.saveAndFlush(lastMinuteOffer);

        // Get the lastMinuteOffer
        restLastMinuteOfferMockMvc.perform(get("/api/last-minute-offers/{id}", lastMinuteOffer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lastMinuteOffer.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.profile").value(DEFAULT_PROFILE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLastMinuteOffer() throws Exception {
        // Get the lastMinuteOffer
        restLastMinuteOfferMockMvc.perform(get("/api/last-minute-offers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLastMinuteOffer() throws Exception {
        // Initialize the database
        lastMinuteOfferRepository.saveAndFlush(lastMinuteOffer);
        lastMinuteOfferSearchRepository.save(lastMinuteOffer);
        int databaseSizeBeforeUpdate = lastMinuteOfferRepository.findAll().size();

        // Update the lastMinuteOffer
        LastMinuteOffer updatedLastMinuteOffer = lastMinuteOfferRepository.findOne(lastMinuteOffer.getId());
        // Disconnect from session so that the updates on updatedLastMinuteOffer are not directly saved in db
        em.detach(updatedLastMinuteOffer);
        updatedLastMinuteOffer
            .name(UPDATED_NAME)
            .profile(UPDATED_PROFILE);

        restLastMinuteOfferMockMvc.perform(put("/api/last-minute-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLastMinuteOffer)))
            .andExpect(status().isOk());

        // Validate the LastMinuteOffer in the database
        List<LastMinuteOffer> lastMinuteOfferList = lastMinuteOfferRepository.findAll();
        assertThat(lastMinuteOfferList).hasSize(databaseSizeBeforeUpdate);
        LastMinuteOffer testLastMinuteOffer = lastMinuteOfferList.get(lastMinuteOfferList.size() - 1);
        assertThat(testLastMinuteOffer.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLastMinuteOffer.getProfile()).isEqualTo(UPDATED_PROFILE);

        // Validate the LastMinuteOffer in Elasticsearch
        LastMinuteOffer lastMinuteOfferEs = lastMinuteOfferSearchRepository.findOne(testLastMinuteOffer.getId());
        assertThat(lastMinuteOfferEs).isEqualToIgnoringGivenFields(testLastMinuteOffer);
    }

    @Test
    @Transactional
    public void updateNonExistingLastMinuteOffer() throws Exception {
        int databaseSizeBeforeUpdate = lastMinuteOfferRepository.findAll().size();

        // Create the LastMinuteOffer

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLastMinuteOfferMockMvc.perform(put("/api/last-minute-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lastMinuteOffer)))
            .andExpect(status().isCreated());

        // Validate the LastMinuteOffer in the database
        List<LastMinuteOffer> lastMinuteOfferList = lastMinuteOfferRepository.findAll();
        assertThat(lastMinuteOfferList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLastMinuteOffer() throws Exception {
        // Initialize the database
        lastMinuteOfferRepository.saveAndFlush(lastMinuteOffer);
        lastMinuteOfferSearchRepository.save(lastMinuteOffer);
        int databaseSizeBeforeDelete = lastMinuteOfferRepository.findAll().size();

        // Get the lastMinuteOffer
        restLastMinuteOfferMockMvc.perform(delete("/api/last-minute-offers/{id}", lastMinuteOffer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean lastMinuteOfferExistsInEs = lastMinuteOfferSearchRepository.exists(lastMinuteOffer.getId());
        assertThat(lastMinuteOfferExistsInEs).isFalse();

        // Validate the database is empty
        List<LastMinuteOffer> lastMinuteOfferList = lastMinuteOfferRepository.findAll();
        assertThat(lastMinuteOfferList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchLastMinuteOffer() throws Exception {
        // Initialize the database
        lastMinuteOfferRepository.saveAndFlush(lastMinuteOffer);
        lastMinuteOfferSearchRepository.save(lastMinuteOffer);

        // Search the lastMinuteOffer
        restLastMinuteOfferMockMvc.perform(get("/api/_search/last-minute-offers?query=id:" + lastMinuteOffer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lastMinuteOffer.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].profile").value(hasItem(DEFAULT_PROFILE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LastMinuteOffer.class);
        LastMinuteOffer lastMinuteOffer1 = new LastMinuteOffer();
        lastMinuteOffer1.setId(1L);
        LastMinuteOffer lastMinuteOffer2 = new LastMinuteOffer();
        lastMinuteOffer2.setId(lastMinuteOffer1.getId());
        assertThat(lastMinuteOffer1).isEqualTo(lastMinuteOffer2);
        lastMinuteOffer2.setId(2L);
        assertThat(lastMinuteOffer1).isNotEqualTo(lastMinuteOffer2);
        lastMinuteOffer1.setId(null);
        assertThat(lastMinuteOffer1).isNotEqualTo(lastMinuteOffer2);
    }
}
