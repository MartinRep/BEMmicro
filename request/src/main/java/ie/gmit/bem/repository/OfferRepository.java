package ie.gmit.bem.repository;

import ie.gmit.bem.domain.Offer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Offer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

}
