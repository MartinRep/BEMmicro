package ie.gmit.bem.repository;

import ie.gmit.bem.domain.LastMinuteSevice;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the LastMinuteSevice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LastMinuteSeviceRepository extends JpaRepository<LastMinuteSevice, Long> {

}
