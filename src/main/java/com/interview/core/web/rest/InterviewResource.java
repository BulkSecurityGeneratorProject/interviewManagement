package com.interview.core.web.rest;
import com.interview.core.domain.Interview;
import com.interview.core.service.InterviewService;
import com.interview.core.web.rest.errors.BadRequestAlertException;
import com.interview.core.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Interview.
 */
@RestController
@RequestMapping("/api")
public class InterviewResource {

    private final Logger log = LoggerFactory.getLogger(InterviewResource.class);

    private static final String ENTITY_NAME = "interview";

    private final InterviewService interviewService;

    public InterviewResource(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    /**
     * POST  /interviews : Create a new interview.
     *
     * @param interview the interview to create
     * @return the ResponseEntity with status 201 (Created) and with body the new interview, or with status 400 (Bad Request) if the interview has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/interviews")
    public ResponseEntity<Interview> createInterview(@Valid @RequestBody Interview interview) throws URISyntaxException {
        log.debug("REST request to save Interview : {}", interview);
        if (interview.getId() != null) {
            throw new BadRequestAlertException("A new interview cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Interview result = interviewService.save(interview);
        return ResponseEntity.created(new URI("/api/interviews/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /interviews : Updates an existing interview.
     *
     * @param interview the interview to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated interview,
     * or with status 400 (Bad Request) if the interview is not valid,
     * or with status 500 (Internal Server Error) if the interview couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/interviews")
    public ResponseEntity<Interview> updateInterview(@Valid @RequestBody Interview interview) throws URISyntaxException {
        log.debug("REST request to update Interview : {}", interview);
        if (interview.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Interview result = interviewService.save(interview);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, interview.getId().toString()))
            .body(result);
    }

    /**
     * GET  /interviews : get all the interviews.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of interviews in body
     */
    @GetMapping("/interviews")
    public List<Interview> getAllInterviews() {
        log.debug("REST request to get all Interviews");
        return interviewService.findAll();
    }

    /**
     * GET  /interviews/:id : get the "id" interview.
     *
     * @param id the id of the interview to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the interview, or with status 404 (Not Found)
     */
    @GetMapping("/interviews/{id}")
    public ResponseEntity<Interview> getInterview(@PathVariable Long id) {
        log.debug("REST request to get Interview : {}", id);
        Optional<Interview> interview = interviewService.findOne(id);
        return ResponseUtil.wrapOrNotFound(interview);
    }

    /**
     * DELETE  /interviews/:id : delete the "id" interview.
     *
     * @param id the id of the interview to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/interviews/{id}")
    public ResponseEntity<Void> deleteInterview(@PathVariable Long id) {
        log.debug("REST request to delete Interview : {}", id);
        interviewService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/interviews?query=:query : search for the interview corresponding
     * to the query.
     *
     * @param query the query of the interview search
     * @return the result of the search
     */
    @GetMapping("/_search/interviews")
    public List<Interview> searchInterviews(@RequestParam String query) {
        log.debug("REST request to search Interviews for query {}", query);
        return interviewService.search(query);
    }

}
