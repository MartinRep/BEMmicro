package ie.gmit.bem.repository;

import ie.gmit.bem.domain.LastMinuteService;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the LastMinuteService entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LastMinuteServiceRepository extends JpaRepository<LastMinuteService, Long> {

}
