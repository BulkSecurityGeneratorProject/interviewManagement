package com.interview.core.service.impl;

import com.interview.core.service.InterviewService;
import com.interview.core.domain.Interview;
import com.interview.core.repository.InterviewRepository;
import com.interview.core.repository.search.InterviewSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Interview.
 */
@Service
@Transactional
public class InterviewServiceImpl implements InterviewService {

    private final Logger log = LoggerFactory.getLogger(InterviewServiceImpl.class);

    private final InterviewRepository interviewRepository;

    private final InterviewSearchRepository interviewSearchRepository;

    public InterviewServiceImpl(InterviewRepository interviewRepository, InterviewSearchRepository interviewSearchRepository) {
        this.interviewRepository = interviewRepository;
        this.interviewSearchRepository = interviewSearchRepository;
    }

    /**
     * Save a interview.
     *
     * @param interview the entity to save
     * @return the persisted entity
     */
    @Override
    public Interview save(Interview interview) {
        log.debug("Request to save Interview : {}", interview);
        Interview result = interviewRepository.save(interview);
        interviewSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the interviews.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Interview> findAll() {
        log.debug("Request to get all Interviews");
        return interviewRepository.findAll();
    }


    /**
     * Get one interview by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Interview> findOne(Long id) {
        log.debug("Request to get Interview : {}", id);
        return interviewRepository.findById(id);
    }

    /**
     * Delete the interview by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Interview : {}", id);        interviewRepository.deleteById(id);
        interviewSearchRepository.deleteById(id);
    }

    /**
     * Search for the interview corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Interview> search(String query) {
        log.debug("Request to search Interviews for query {}", query);
        return StreamSupport
            .stream(interviewSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
