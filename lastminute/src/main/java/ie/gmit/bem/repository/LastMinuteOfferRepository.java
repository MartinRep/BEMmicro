package ie.gmit.bem.repository;

import ie.gmit.bem.domain.LastMinuteOffer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the LastMinuteOffer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LastMinuteOfferRepository extends JpaRepository<LastMinuteOffer, Long> {

}
