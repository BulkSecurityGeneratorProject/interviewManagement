package com.interview.core.service;

import com.interview.core.domain.Interview;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Interview.
 */
public interface InterviewService {

    /**
     * Save a interview.
     *
     * @param interview the entity to save
     * @return the persisted entity
     */
    Interview save(Interview interview);

    /**
     * Get all the interviews.
     *
     * @return the list of entities
     */
    List<Interview> findAll();


    /**
     * Get the "id" interview.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Interview> findOne(Long id);

    /**
     * Delete the "id" interview.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the interview corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<Interview> search(String query);
}
