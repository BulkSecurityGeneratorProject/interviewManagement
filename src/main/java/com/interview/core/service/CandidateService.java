package com.interview.core.service;

import com.interview.core.domain.Candidate;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Candidate.
 */
public interface CandidateService {

    /**
     * Save a candidate.
     *
     * @param candidate the entity to save
     * @return the persisted entity
     */
    Candidate save(Candidate candidate);

    /**
     * Get all the candidates.
     *
     * @return the list of entities
     */
    List<Candidate> findAll();


    /**
     * Get the "id" candidate.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Candidate> findOne(Long id);

    /**
     * Delete the "id" candidate.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the candidate corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<Candidate> search(String query);
}
