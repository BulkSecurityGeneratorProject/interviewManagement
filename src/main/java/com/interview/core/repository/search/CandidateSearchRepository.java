package com.interview.core.repository.search;

import com.interview.core.domain.Candidate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Candidate entity.
 */
public interface CandidateSearchRepository extends ElasticsearchRepository<Candidate, Long> {
}
