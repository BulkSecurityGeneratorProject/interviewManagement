package com.interview.core.web.rest;

import com.interview.core.InterviewManagementApp;

import com.interview.core.domain.Interview;
import com.interview.core.repository.InterviewRepository;
import com.interview.core.repository.search.InterviewSearchRepository;
import com.interview.core.service.InterviewService;
import com.interview.core.web.rest.errors.ExceptionTranslator;

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
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;


import static com.interview.core.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the InterviewResource REST controller.
 *
 * @see InterviewResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InterviewManagementApp.class)
public class InterviewResourceIntTest {

    private static final String DEFAULT_LEVEL = "AAAAAAAAAA";
    private static final String UPDATED_LEVEL = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_INTERVIEW_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_INTERVIEW_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_INTERVIEWER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_INTERVIEWER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_INTERVIEWER_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_INTERVIEWER_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_INTERVIEWER_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_INTERVIEWER_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENTS = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTS = "BBBBBBBBBB";

    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private InterviewService interviewService;

    /**
     * This repository is mocked in the com.interview.core.repository.search test package.
     *
     * @see com.interview.core.repository.search.InterviewSearchRepositoryMockConfiguration
     */
    @Autowired
    private InterviewSearchRepository mockInterviewSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restInterviewMockMvc;

    private Interview interview;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InterviewResource interviewResource = new InterviewResource(interviewService);
        this.restInterviewMockMvc = MockMvcBuilders.standaloneSetup(interviewResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Interview createEntity(EntityManager em) {
        Interview interview = new Interview()
            .level(DEFAULT_LEVEL)
            .interviewDate(DEFAULT_INTERVIEW_DATE)
            .interviewerName(DEFAULT_INTERVIEWER_NAME)
            .interviewerEmail(DEFAULT_INTERVIEWER_EMAIL)
            .interviewerPhone(DEFAULT_INTERVIEWER_PHONE)
            .status(DEFAULT_STATUS)
            .comments(DEFAULT_COMMENTS);
        return interview;
    }

    @Before
    public void initTest() {
        interview = createEntity(em);
    }

    @Test
    @Transactional
    public void createInterview() throws Exception {
        int databaseSizeBeforeCreate = interviewRepository.findAll().size();

        // Create the Interview
        restInterviewMockMvc.perform(post("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interview)))
            .andExpect(status().isCreated());

        // Validate the Interview in the database
        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeCreate + 1);
        Interview testInterview = interviewList.get(interviewList.size() - 1);
        assertThat(testInterview.getLevel()).isEqualTo(DEFAULT_LEVEL);
        assertThat(testInterview.getInterviewDate()).isEqualTo(DEFAULT_INTERVIEW_DATE);
        assertThat(testInterview.getInterviewerName()).isEqualTo(DEFAULT_INTERVIEWER_NAME);
        assertThat(testInterview.getInterviewerEmail()).isEqualTo(DEFAULT_INTERVIEWER_EMAIL);
        assertThat(testInterview.getInterviewerPhone()).isEqualTo(DEFAULT_INTERVIEWER_PHONE);
        assertThat(testInterview.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testInterview.getComments()).isEqualTo(DEFAULT_COMMENTS);

        // Validate the Interview in Elasticsearch
        verify(mockInterviewSearchRepository, times(1)).save(testInterview);
    }

    @Test
    @Transactional
    public void createInterviewWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = interviewRepository.findAll().size();

        // Create the Interview with an existing ID
        interview.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInterviewMockMvc.perform(post("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interview)))
            .andExpect(status().isBadRequest());

        // Validate the Interview in the database
        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeCreate);

        // Validate the Interview in Elasticsearch
        verify(mockInterviewSearchRepository, times(0)).save(interview);
    }

    @Test
    @Transactional
    public void checkLevelIsRequired() throws Exception {
        int databaseSizeBeforeTest = interviewRepository.findAll().size();
        // set the field null
        interview.setLevel(null);

        // Create the Interview, which fails.

        restInterviewMockMvc.perform(post("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interview)))
            .andExpect(status().isBadRequest());

        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkInterviewDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = interviewRepository.findAll().size();
        // set the field null
        interview.setInterviewDate(null);

        // Create the Interview, which fails.

        restInterviewMockMvc.perform(post("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interview)))
            .andExpect(status().isBadRequest());

        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkInterviewerNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = interviewRepository.findAll().size();
        // set the field null
        interview.setInterviewerName(null);

        // Create the Interview, which fails.

        restInterviewMockMvc.perform(post("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interview)))
            .andExpect(status().isBadRequest());

        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = interviewRepository.findAll().size();
        // set the field null
        interview.setStatus(null);

        // Create the Interview, which fails.

        restInterviewMockMvc.perform(post("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interview)))
            .andExpect(status().isBadRequest());

        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInterviews() throws Exception {
        // Initialize the database
        interviewRepository.saveAndFlush(interview);

        // Get all the interviewList
        restInterviewMockMvc.perform(get("/api/interviews?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(interview.getId().intValue())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL.toString())))
            .andExpect(jsonPath("$.[*].interviewDate").value(hasItem(DEFAULT_INTERVIEW_DATE.toString())))
            .andExpect(jsonPath("$.[*].interviewerName").value(hasItem(DEFAULT_INTERVIEWER_NAME.toString())))
            .andExpect(jsonPath("$.[*].interviewerEmail").value(hasItem(DEFAULT_INTERVIEWER_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].interviewerPhone").value(hasItem(DEFAULT_INTERVIEWER_PHONE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS.toString())));
    }
    
    @Test
    @Transactional
    public void getInterview() throws Exception {
        // Initialize the database
        interviewRepository.saveAndFlush(interview);

        // Get the interview
        restInterviewMockMvc.perform(get("/api/interviews/{id}", interview.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(interview.getId().intValue()))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL.toString()))
            .andExpect(jsonPath("$.interviewDate").value(DEFAULT_INTERVIEW_DATE.toString()))
            .andExpect(jsonPath("$.interviewerName").value(DEFAULT_INTERVIEWER_NAME.toString()))
            .andExpect(jsonPath("$.interviewerEmail").value(DEFAULT_INTERVIEWER_EMAIL.toString()))
            .andExpect(jsonPath("$.interviewerPhone").value(DEFAULT_INTERVIEWER_PHONE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.comments").value(DEFAULT_COMMENTS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInterview() throws Exception {
        // Get the interview
        restInterviewMockMvc.perform(get("/api/interviews/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInterview() throws Exception {
        // Initialize the database
        interviewService.save(interview);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockInterviewSearchRepository);

        int databaseSizeBeforeUpdate = interviewRepository.findAll().size();

        // Update the interview
        Interview updatedInterview = interviewRepository.findById(interview.getId()).get();
        // Disconnect from session so that the updates on updatedInterview are not directly saved in db
        em.detach(updatedInterview);
        updatedInterview
            .level(UPDATED_LEVEL)
            .interviewDate(UPDATED_INTERVIEW_DATE)
            .interviewerName(UPDATED_INTERVIEWER_NAME)
            .interviewerEmail(UPDATED_INTERVIEWER_EMAIL)
            .interviewerPhone(UPDATED_INTERVIEWER_PHONE)
            .status(UPDATED_STATUS)
            .comments(UPDATED_COMMENTS);

        restInterviewMockMvc.perform(put("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInterview)))
            .andExpect(status().isOk());

        // Validate the Interview in the database
        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeUpdate);
        Interview testInterview = interviewList.get(interviewList.size() - 1);
        assertThat(testInterview.getLevel()).isEqualTo(UPDATED_LEVEL);
        assertThat(testInterview.getInterviewDate()).isEqualTo(UPDATED_INTERVIEW_DATE);
        assertThat(testInterview.getInterviewerName()).isEqualTo(UPDATED_INTERVIEWER_NAME);
        assertThat(testInterview.getInterviewerEmail()).isEqualTo(UPDATED_INTERVIEWER_EMAIL);
        assertThat(testInterview.getInterviewerPhone()).isEqualTo(UPDATED_INTERVIEWER_PHONE);
        assertThat(testInterview.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testInterview.getComments()).isEqualTo(UPDATED_COMMENTS);

        // Validate the Interview in Elasticsearch
        verify(mockInterviewSearchRepository, times(1)).save(testInterview);
    }

    @Test
    @Transactional
    public void updateNonExistingInterview() throws Exception {
        int databaseSizeBeforeUpdate = interviewRepository.findAll().size();

        // Create the Interview

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInterviewMockMvc.perform(put("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interview)))
            .andExpect(status().isBadRequest());

        // Validate the Interview in the database
        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Interview in Elasticsearch
        verify(mockInterviewSearchRepository, times(0)).save(interview);
    }

    @Test
    @Transactional
    public void deleteInterview() throws Exception {
        // Initialize the database
        interviewService.save(interview);

        int databaseSizeBeforeDelete = interviewRepository.findAll().size();

        // Delete the interview
        restInterviewMockMvc.perform(delete("/api/interviews/{id}", interview.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Interview in Elasticsearch
        verify(mockInterviewSearchRepository, times(1)).deleteById(interview.getId());
    }

    @Test
    @Transactional
    public void searchInterview() throws Exception {
        // Initialize the database
        interviewService.save(interview);
        when(mockInterviewSearchRepository.search(queryStringQuery("id:" + interview.getId())))
            .thenReturn(Collections.singletonList(interview));
        // Search the interview
        restInterviewMockMvc.perform(get("/api/_search/interviews?query=id:" + interview.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(interview.getId().intValue())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)))
            .andExpect(jsonPath("$.[*].interviewDate").value(hasItem(DEFAULT_INTERVIEW_DATE.toString())))
            .andExpect(jsonPath("$.[*].interviewerName").value(hasItem(DEFAULT_INTERVIEWER_NAME)))
            .andExpect(jsonPath("$.[*].interviewerEmail").value(hasItem(DEFAULT_INTERVIEWER_EMAIL)))
            .andExpect(jsonPath("$.[*].interviewerPhone").value(hasItem(DEFAULT_INTERVIEWER_PHONE)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Interview.class);
        Interview interview1 = new Interview();
        interview1.setId(1L);
        Interview interview2 = new Interview();
        interview2.setId(interview1.getId());
        assertThat(interview1).isEqualTo(interview2);
        interview2.setId(2L);
        assertThat(interview1).isNotEqualTo(interview2);
        interview1.setId(null);
        assertThat(interview1).isNotEqualTo(interview2);
    }
}
