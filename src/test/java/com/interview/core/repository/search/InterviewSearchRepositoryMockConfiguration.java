package com.interview.core.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of InterviewSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class InterviewSearchRepositoryMockConfiguration {

    @MockBean
    private InterviewSearchRepository mockInterviewSearchRepository;

}
