package com.interview.core.repository;

import com.interview.core.domain.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Candidate entity.
 */
@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    @Query(value = "select * from candidate c where c.phone_no like %:query%", nativeQuery = true)
    List<Candidate> findOnQueryByPhoneNo(@Param("query") String id);

    @Query(value = "select * from candidate c where c.name like %:query%", nativeQuery = true)
    List<Candidate> findOnQueryByName(@Param("query") String query);

    @Query(value = "select * from candidate c where c.email like %:query%", nativeQuery = true)
    List<Candidate> findOnQueryByEmail(@Param("query") String query);

    @Query(value = "select * from candidate c where c.experience like %:query%", nativeQuery = true)
    List<Candidate> findOnQueryByExperience(@Param("query") String query);
}
