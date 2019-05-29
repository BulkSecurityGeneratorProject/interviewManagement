package com.interview.core.service.impl;

import com.interview.core.domain.Candidate;
import com.interview.core.repository.CandidateRepository;
import com.interview.core.repository.search.CandidateSearchRepository;
import com.interview.core.service.CandidateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Candidate.
 */
@Service
@Transactional
public class CandidateServiceImpl implements CandidateService {

    private final Logger log = LoggerFactory.getLogger(CandidateServiceImpl.class);

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private CandidateSearchRepository candidateSearchRepository;

    /**
     * Save a candidate.
     *
     * @param candidate the entity to save
     * @return the persisted entity
     */
    @Override
    public Candidate save(Candidate candidate) {
        Candidate result = candidateRepository.save(candidate);
        candidateSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the candidates.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Candidate> findAll() {
        return candidateRepository.findAll();
    }


    /**
     * Get one candidate by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Candidate> findOne(Long id) {
        Optional<Candidate> oc = candidateRepository.findById(id);
        oc.ifPresent(candi -> {
            log.debug("****************", candi.getInterviews());
        });
        return oc;

    }

    /**
     * Delete the candidate by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        candidateRepository.deleteById(id);
        candidateSearchRepository.deleteById(id);
    }

    /**
     * Search for the candidate corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    public List<Candidate> searchPhoneNo(String query) {
        return candidateRepository.findOnQueryByPhoneNo(query);
    }

    /**
     * Search for the candidate corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Candidate> searchName(String query) {
        return candidateRepository.findOnQueryByName(query);
    }

    /**
     * Search for the candidate corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Candidate> searchEmail(String query) {
        return candidateRepository.findOnQueryByEmail(query);
    }

    /**
     * Search for the candidate corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Candidate> searchExperience(String query) {
        return candidateRepository.findOnQueryByExperience(query);
    }

}
