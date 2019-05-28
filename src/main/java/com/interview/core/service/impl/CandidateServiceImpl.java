package com.interview.core.service.impl;

import com.interview.core.service.CandidateService;
import com.interview.core.domain.Candidate;
import com.interview.core.repository.CandidateRepository;
import com.interview.core.repository.search.CandidateSearchRepository;
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
 * Service Implementation for managing Candidate.
 */
@Service
@Transactional
public class CandidateServiceImpl implements CandidateService {

    private final Logger log = LoggerFactory.getLogger(CandidateServiceImpl.class);

    private final CandidateRepository candidateRepository;

    private final CandidateSearchRepository candidateSearchRepository;

    public CandidateServiceImpl(CandidateRepository candidateRepository, CandidateSearchRepository candidateSearchRepository) {
        this.candidateRepository = candidateRepository;
        this.candidateSearchRepository = candidateSearchRepository;
    }

    /**
     * Save a candidate.
     *
     * @param candidate the entity to save
     * @return the persisted entity
     */
    @Override
    public Candidate save(Candidate candidate) {
        log.debug("Request to save Candidate : {}", candidate);
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
        log.debug("Request to get all Candidates");
        List<Candidate> lc=  candidateRepository.findAll();
        log.debug("***************"+lc.get(0).getInterviews());
        return lc;
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
        log.debug("Request to get Candidate : {}", id);
        Optional<Candidate>  oc = candidateRepository.findById(id);
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
        log.debug("Request to delete Candidate : {}", id);        candidateRepository.deleteById(id);
        candidateSearchRepository.deleteById(id);
    }

    /**
     * Search for the candidate corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    // @Override
    // @Transactional(readOnly = true)
    // public List<Candidate> search(String query) {
    //     log.debug("Request to search Candidates for query {}", query);
    //     return candidateSearchRepository.findOnQuery(query);

    // }
}
