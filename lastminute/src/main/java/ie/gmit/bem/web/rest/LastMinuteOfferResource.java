package ie.gmit.bem.web.rest;

import com.codahale.metrics.annotation.Timed;
import ie.gmit.bem.domain.LastMinuteOffer;

import ie.gmit.bem.repository.LastMinuteOfferRepository;
import ie.gmit.bem.web.rest.errors.BadRequestAlertException;
import ie.gmit.bem.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing LastMinuteOffer.
 */
@RestController
@RequestMapping("/api")
public class LastMinuteOfferResource {

    private final Logger log = LoggerFactory.getLogger(LastMinuteOfferResource.class);

    private static final String ENTITY_NAME = "lastMinuteOffer";

    private final LastMinuteOfferRepository lastMinuteOfferRepository;

    public LastMinuteOfferResource(LastMinuteOfferRepository lastMinuteOfferRepository) {
        this.lastMinuteOfferRepository = lastMinuteOfferRepository;
    }

    /**
     * POST  /last-minute-offers : Create a new lastMinuteOffer.
     *
     * @param lastMinuteOffer the lastMinuteOffer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lastMinuteOffer, or with status 400 (Bad Request) if the lastMinuteOffer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/last-minute-offers")
    @Timed
    public ResponseEntity<LastMinuteOffer> createLastMinuteOffer(@RequestBody LastMinuteOffer lastMinuteOffer) throws URISyntaxException {
        log.debug("REST request to save LastMinuteOffer : {}", lastMinuteOffer);
        if (lastMinuteOffer.getId() != null) {
            throw new BadRequestAlertException("A new lastMinuteOffer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LastMinuteOffer result = lastMinuteOfferRepository.save(lastMinuteOffer);
        return ResponseEntity.created(new URI("/api/last-minute-offers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /last-minute-offers : Updates an existing lastMinuteOffer.
     *
     * @param lastMinuteOffer the lastMinuteOffer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lastMinuteOffer,
     * or with status 400 (Bad Request) if the lastMinuteOffer is not valid,
     * or with status 500 (Internal Server Error) if the lastMinuteOffer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/last-minute-offers")
    @Timed
    public ResponseEntity<LastMinuteOffer> updateLastMinuteOffer(@RequestBody LastMinuteOffer lastMinuteOffer) throws URISyntaxException {
        log.debug("REST request to update LastMinuteOffer : {}", lastMinuteOffer);
        if (lastMinuteOffer.getId() == null) {
            return createLastMinuteOffer(lastMinuteOffer);
        }
        LastMinuteOffer result = lastMinuteOfferRepository.save(lastMinuteOffer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lastMinuteOffer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /last-minute-offers : get all the lastMinuteOffers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of lastMinuteOffers in body
     */
    @GetMapping("/last-minute-offers")
    @Timed
    public List<LastMinuteOffer> getAllLastMinuteOffers() {
        log.debug("REST request to get all LastMinuteOffers");
        return lastMinuteOfferRepository.findAll();
        }

    /**
     * GET  /last-minute-offers/:id : get the "id" lastMinuteOffer.
     *
     * @param id the id of the lastMinuteOffer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lastMinuteOffer, or with status 404 (Not Found)
     */
    @GetMapping("/last-minute-offers/{id}")
    @Timed
    public ResponseEntity<LastMinuteOffer> getLastMinuteOffer(@PathVariable Long id) {
        log.debug("REST request to get LastMinuteOffer : {}", id);
        LastMinuteOffer lastMinuteOffer = lastMinuteOfferRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(lastMinuteOffer));
    }

    /**
     * DELETE  /last-minute-offers/:id : delete the "id" lastMinuteOffer.
     *
     * @param id the id of the lastMinuteOffer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/last-minute-offers/{id}")
    @Timed
    public ResponseEntity<Void> deleteLastMinuteOffer(@PathVariable Long id) {
        log.debug("REST request to delete LastMinuteOffer : {}", id);
        lastMinuteOfferRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
