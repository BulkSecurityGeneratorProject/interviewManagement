package com.interview.core.repository.search;

import com.interview.core.domain.Interview;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Interview entity.
 */
public interface InterviewSearchRepository extends ElasticsearchRepository<Interview, Long> {
}
