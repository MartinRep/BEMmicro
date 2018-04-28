package ie.gmit.bem.web.rest;

import ie.gmit.bem.LastminuteApp;

import ie.gmit.bem.domain.LastMinuteService;
import ie.gmit.bem.repository.LastMinuteServiceRepository;
import ie.gmit.bem.repository.search.LastMinuteServiceSearchRepository;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static ie.gmit.bem.web.rest.TestUtil.sameInstant;
import static ie.gmit.bem.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the LastMinuteServiceResource REST controller.
 *
 * @see LastMinuteServiceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LastminuteApp.class)
public class LastMinuteServiceResourceIntTest {

    private static final Integer DEFAULT_CATEGORY = 1;
    private static final Integer UPDATED_CATEGORY = 2;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_AVAILABLE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_AVAILABLE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_PROFILE = "AAAAAAAAAA";
    private static final String UPDATED_PROFILE = "BBBBBBBBBB";

    @Autowired
    private LastMinuteServiceRepository lastMinuteServiceRepository;

    @Autowired
    private LastMinuteServiceSearchRepository lastMinuteServiceSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLastMinuteServiceMockMvc;

    private LastMinuteService lastMinuteService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LastMinuteServiceResource lastMinuteServiceResource = new LastMinuteServiceResource(lastMinuteServiceRepository, lastMinuteServiceSearchRepository);
        this.restLastMinuteServiceMockMvc = MockMvcBuilders.standaloneSetup(lastMinuteServiceResource)
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
    public static LastMinuteService createEntity(EntityManager em) {
        LastMinuteService lastMinuteService = new LastMinuteService()
            .category(DEFAULT_CATEGORY)
            .description(DEFAULT_DESCRIPTION)
            .available(DEFAULT_AVAILABLE)
            .location(DEFAULT_LOCATION)
            .price(DEFAULT_PRICE)
            .address(DEFAULT_ADDRESS)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .profile(DEFAULT_PROFILE);
        return lastMinuteService;
    }

    @Before
    public void initTest() {
        lastMinuteServiceSearchRepository.deleteAll();
        lastMinuteService = createEntity(em);
    }

    @Test
    @Transactional
    public void createLastMinuteService() throws Exception {
        int databaseSizeBeforeCreate = lastMinuteServiceRepository.findAll().size();

        // Create the LastMinuteService
        restLastMinuteServiceMockMvc.perform(post("/api/last-minute-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lastMinuteService)))
            .andExpect(status().isCreated());

        // Validate the LastMinuteService in the database
        List<LastMinuteService> lastMinuteServiceList = lastMinuteServiceRepository.findAll();
        assertThat(lastMinuteServiceList).hasSize(databaseSizeBeforeCreate + 1);
        LastMinuteService testLastMinuteService = lastMinuteServiceList.get(lastMinuteServiceList.size() - 1);
        assertThat(testLastMinuteService.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testLastMinuteService.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testLastMinuteService.getAvailable()).isEqualTo(DEFAULT_AVAILABLE);
        assertThat(testLastMinuteService.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testLastMinuteService.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testLastMinuteService.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testLastMinuteService.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testLastMinuteService.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testLastMinuteService.getProfile()).isEqualTo(DEFAULT_PROFILE);

        // Validate the LastMinuteService in Elasticsearch
        LastMinuteService lastMinuteServiceEs = lastMinuteServiceSearchRepository.findOne(testLastMinuteService.getId());
        assertThat(testLastMinuteService.getAvailable()).isEqualTo(testLastMinuteService.getAvailable());
        assertThat(lastMinuteServiceEs).isEqualToIgnoringGivenFields(testLastMinuteService, "available");
    }

    @Test
    @Transactional
    public void createLastMinuteServiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lastMinuteServiceRepository.findAll().size();

        // Create the LastMinuteService with an existing ID
        lastMinuteService.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLastMinuteServiceMockMvc.perform(post("/api/last-minute-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lastMinuteService)))
            .andExpect(status().isBadRequest());

        // Validate the LastMinuteService in the database
        List<LastMinuteService> lastMinuteServiceList = lastMinuteServiceRepository.findAll();
        assertThat(lastMinuteServiceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCategoryIsRequired() throws Exception {
        int databaseSizeBeforeTest = lastMinuteServiceRepository.findAll().size();
        // set the field null
        lastMinuteService.setCategory(null);

        // Create the LastMinuteService, which fails.

        restLastMinuteServiceMockMvc.perform(post("/api/last-minute-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lastMinuteService)))
            .andExpect(status().isBadRequest());

        List<LastMinuteService> lastMinuteServiceList = lastMinuteServiceRepository.findAll();
        assertThat(lastMinuteServiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = lastMinuteServiceRepository.findAll().size();
        // set the field null
        lastMinuteService.setDescription(null);

        // Create the LastMinuteService, which fails.

        restLastMinuteServiceMockMvc.perform(post("/api/last-minute-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lastMinuteService)))
            .andExpect(status().isBadRequest());

        List<LastMinuteService> lastMinuteServiceList = lastMinuteServiceRepository.findAll();
        assertThat(lastMinuteServiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = lastMinuteServiceRepository.findAll().size();
        // set the field null
        lastMinuteService.setLocation(null);

        // Create the LastMinuteService, which fails.

        restLastMinuteServiceMockMvc.perform(post("/api/last-minute-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lastMinuteService)))
            .andExpect(status().isBadRequest());

        List<LastMinuteService> lastMinuteServiceList = lastMinuteServiceRepository.findAll();
        assertThat(lastMinuteServiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = lastMinuteServiceRepository.findAll().size();
        // set the field null
        lastMinuteService.setPrice(null);

        // Create the LastMinuteService, which fails.

        restLastMinuteServiceMockMvc.perform(post("/api/last-minute-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lastMinuteService)))
            .andExpect(status().isBadRequest());

        List<LastMinuteService> lastMinuteServiceList = lastMinuteServiceRepository.findAll();
        assertThat(lastMinuteServiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = lastMinuteServiceRepository.findAll().size();
        // set the field null
        lastMinuteService.setAddress(null);

        // Create the LastMinuteService, which fails.

        restLastMinuteServiceMockMvc.perform(post("/api/last-minute-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lastMinuteService)))
            .andExpect(status().isBadRequest());

        List<LastMinuteService> lastMinuteServiceList = lastMinuteServiceRepository.findAll();
        assertThat(lastMinuteServiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLastMinuteServices() throws Exception {
        // Initialize the database
        lastMinuteServiceRepository.saveAndFlush(lastMinuteService);

        // Get all the lastMinuteServiceList
        restLastMinuteServiceMockMvc.perform(get("/api/last-minute-services?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lastMinuteService.getId().intValue())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].available").value(hasItem(sameInstant(DEFAULT_AVAILABLE))))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].profile").value(hasItem(DEFAULT_PROFILE.toString())));
    }

    @Test
    @Transactional
    public void getLastMinuteService() throws Exception {
        // Initialize the database
        lastMinuteServiceRepository.saveAndFlush(lastMinuteService);

        // Get the lastMinuteService
        restLastMinuteServiceMockMvc.perform(get("/api/last-minute-services/{id}", lastMinuteService.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lastMinuteService.getId().intValue()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.available").value(sameInstant(DEFAULT_AVAILABLE)))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.profile").value(DEFAULT_PROFILE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLastMinuteService() throws Exception {
        // Get the lastMinuteService
        restLastMinuteServiceMockMvc.perform(get("/api/last-minute-services/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLastMinuteService() throws Exception {
        // Initialize the database
        lastMinuteServiceRepository.saveAndFlush(lastMinuteService);
        lastMinuteServiceSearchRepository.save(lastMinuteService);
        int databaseSizeBeforeUpdate = lastMinuteServiceRepository.findAll().size();

        // Update the lastMinuteService
        LastMinuteService updatedLastMinuteService = lastMinuteServiceRepository.findOne(lastMinuteService.getId());
        // Disconnect from session so that the updates on updatedLastMinuteService are not directly saved in db
        em.detach(updatedLastMinuteService);
        updatedLastMinuteService
            .category(UPDATED_CATEGORY)
            .description(UPDATED_DESCRIPTION)
            .available(UPDATED_AVAILABLE)
            .location(UPDATED_LOCATION)
            .price(UPDATED_PRICE)
            .address(UPDATED_ADDRESS)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .profile(UPDATED_PROFILE);

        restLastMinuteServiceMockMvc.perform(put("/api/last-minute-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLastMinuteService)))
            .andExpect(status().isOk());

        // Validate the LastMinuteService in the database
        List<LastMinuteService> lastMinuteServiceList = lastMinuteServiceRepository.findAll();
        assertThat(lastMinuteServiceList).hasSize(databaseSizeBeforeUpdate);
        LastMinuteService testLastMinuteService = lastMinuteServiceList.get(lastMinuteServiceList.size() - 1);
        assertThat(testLastMinuteService.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testLastMinuteService.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testLastMinuteService.getAvailable()).isEqualTo(UPDATED_AVAILABLE);
        assertThat(testLastMinuteService.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testLastMinuteService.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testLastMinuteService.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testLastMinuteService.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testLastMinuteService.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testLastMinuteService.getProfile()).isEqualTo(UPDATED_PROFILE);

        // Validate the LastMinuteService in Elasticsearch
        LastMinuteService lastMinuteServiceEs = lastMinuteServiceSearchRepository.findOne(testLastMinuteService.getId());
        assertThat(testLastMinuteService.getAvailable()).isEqualTo(testLastMinuteService.getAvailable());
        assertThat(lastMinuteServiceEs).isEqualToIgnoringGivenFields(testLastMinuteService, "available");
    }

    @Test
    @Transactional
    public void updateNonExistingLastMinuteService() throws Exception {
        int databaseSizeBeforeUpdate = lastMinuteServiceRepository.findAll().size();

        // Create the LastMinuteService

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLastMinuteServiceMockMvc.perform(put("/api/last-minute-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lastMinuteService)))
            .andExpect(status().isCreated());

        // Validate the LastMinuteService in the database
        List<LastMinuteService> lastMinuteServiceList = lastMinuteServiceRepository.findAll();
        assertThat(lastMinuteServiceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLastMinuteService() throws Exception {
        // Initialize the database
        lastMinuteServiceRepository.saveAndFlush(lastMinuteService);
        lastMinuteServiceSearchRepository.save(lastMinuteService);
        int databaseSizeBeforeDelete = lastMinuteServiceRepository.findAll().size();

        // Get the lastMinuteService
        restLastMinuteServiceMockMvc.perform(delete("/api/last-minute-services/{id}", lastMinuteService.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean lastMinuteServiceExistsInEs = lastMinuteServiceSearchRepository.exists(lastMinuteService.getId());
        assertThat(lastMinuteServiceExistsInEs).isFalse();

        // Validate the database is empty
        List<LastMinuteService> lastMinuteServiceList = lastMinuteServiceRepository.findAll();
        assertThat(lastMinuteServiceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchLastMinuteService() throws Exception {
        // Initialize the database
        lastMinuteServiceRepository.saveAndFlush(lastMinuteService);
        lastMinuteServiceSearchRepository.save(lastMinuteService);

        // Search the lastMinuteService
        restLastMinuteServiceMockMvc.perform(get("/api/_search/last-minute-services?query=id:" + lastMinuteService.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lastMinuteService.getId().intValue())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].available").value(hasItem(sameInstant(DEFAULT_AVAILABLE))))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].profile").value(hasItem(DEFAULT_PROFILE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LastMinuteService.class);
        LastMinuteService lastMinuteService1 = new LastMinuteService();
        lastMinuteService1.setId(1L);
        LastMinuteService lastMinuteService2 = new LastMinuteService();
        lastMinuteService2.setId(lastMinuteService1.getId());
        assertThat(lastMinuteService1).isEqualTo(lastMinuteService2);
        lastMinuteService2.setId(2L);
        assertThat(lastMinuteService1).isNotEqualTo(lastMinuteService2);
        lastMinuteService1.setId(null);
        assertThat(lastMinuteService1).isNotEqualTo(lastMinuteService2);
    }
}
