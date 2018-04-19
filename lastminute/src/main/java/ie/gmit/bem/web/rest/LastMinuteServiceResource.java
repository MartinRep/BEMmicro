package ie.gmit.bem.web.rest;

import com.codahale.metrics.annotation.Timed;
import ie.gmit.bem.domain.LastMinuteService;

import ie.gmit.bem.repository.LastMinuteServiceRepository;
import ie.gmit.bem.web.rest.errors.BadRequestAlertException;
import ie.gmit.bem.web.rest.util.HeaderUtil;
import ie.gmit.bem.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing LastMinuteService.
 */
@RestController
@RequestMapping("/api")
public class LastMinuteServiceResource {

    private final Logger log = LoggerFactory.getLogger(LastMinuteServiceResource.class);

    private static final String ENTITY_NAME = "lastMinuteService";

    private final LastMinuteServiceRepository lastMinuteServiceRepository;

    public LastMinuteServiceResource(LastMinuteServiceRepository lastMinuteServiceRepository) {
        this.lastMinuteServiceRepository = lastMinuteServiceRepository;
    }

    /**
     * POST  /last-minute-services : Create a new lastMinuteService.
     *
     * @param lastMinuteService the lastMinuteService to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lastMinuteService, or with status 400 (Bad Request) if the lastMinuteService has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/last-minute-services")
    @Timed
    public ResponseEntity<LastMinuteService> createLastMinuteService(@RequestBody LastMinuteService lastMinuteService) throws URISyntaxException {
        log.debug("REST request to save LastMinuteService : {}", lastMinuteService);
        if (lastMinuteService.getId() != null) {
            throw new BadRequestAlertException("A new lastMinuteService cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LastMinuteService result = lastMinuteServiceRepository.save(lastMinuteService);
        return ResponseEntity.created(new URI("/api/last-minute-services/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /last-minute-services : Updates an existing lastMinuteService.
     *
     * @param lastMinuteService the lastMinuteService to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lastMinuteService,
     * or with status 400 (Bad Request) if the lastMinuteService is not valid,
     * or with status 500 (Internal Server Error) if the lastMinuteService couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/last-minute-services")
    @Timed
    public ResponseEntity<LastMinuteService> updateLastMinuteService(@RequestBody LastMinuteService lastMinuteService) throws URISyntaxException {
        log.debug("REST request to update LastMinuteService : {}", lastMinuteService);
        if (lastMinuteService.getId() == null) {
            return createLastMinuteService(lastMinuteService);
        }
        LastMinuteService result = lastMinuteServiceRepository.save(lastMinuteService);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lastMinuteService.getId().toString()))
            .body(result);
    }

    /**
     * GET  /last-minute-services : get all the lastMinuteServices.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of lastMinuteServices in body
     */
    @GetMapping("/last-minute-services")
    @Timed
    public ResponseEntity<List<LastMinuteService>> getAllLastMinuteServices(Pageable pageable) {
        log.debug("REST request to get a page of LastMinuteServices");
        Page<LastMinuteService> page = lastMinuteServiceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/last-minute-services");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /last-minute-services/:id : get the "id" lastMinuteService.
     *
     * @param id the id of the lastMinuteService to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lastMinuteService, or with status 404 (Not Found)
     */
    @GetMapping("/last-minute-services/{id}")
    @Timed
    public ResponseEntity<LastMinuteService> getLastMinuteService(@PathVariable Long id) {
        log.debug("REST request to get LastMinuteService : {}", id);
        LastMinuteService lastMinuteService = lastMinuteServiceRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(lastMinuteService));
    }

    /**
     * DELETE  /last-minute-services/:id : delete the "id" lastMinuteService.
     *
     * @param id the id of the lastMinuteService to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/last-minute-services/{id}")
    @Timed
    public ResponseEntity<Void> deleteLastMinuteService(@PathVariable Long id) {
        log.debug("REST request to delete LastMinuteService : {}", id);
        lastMinuteServiceRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
