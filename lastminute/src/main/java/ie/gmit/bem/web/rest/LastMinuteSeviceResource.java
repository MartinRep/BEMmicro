package ie.gmit.bem.web.rest;

import com.codahale.metrics.annotation.Timed;
import ie.gmit.bem.domain.LastMinuteSevice;

import ie.gmit.bem.repository.LastMinuteSeviceRepository;
import ie.gmit.bem.repository.search.LastMinuteSeviceSearchRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing LastMinuteSevice.
 */
@RestController
@RequestMapping("/api")
public class LastMinuteSeviceResource {

    private final Logger log = LoggerFactory.getLogger(LastMinuteSeviceResource.class);

    private static final String ENTITY_NAME = "lastMinuteSevice";

    private final LastMinuteSeviceRepository lastMinuteSeviceRepository;

    private final LastMinuteSeviceSearchRepository lastMinuteSeviceSearchRepository;

    public LastMinuteSeviceResource(LastMinuteSeviceRepository lastMinuteSeviceRepository, LastMinuteSeviceSearchRepository lastMinuteSeviceSearchRepository) {
        this.lastMinuteSeviceRepository = lastMinuteSeviceRepository;
        this.lastMinuteSeviceSearchRepository = lastMinuteSeviceSearchRepository;
    }

    /**
     * POST  /last-minute-sevices : Create a new lastMinuteSevice.
     *
     * @param lastMinuteSevice the lastMinuteSevice to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lastMinuteSevice, or with status 400 (Bad Request) if the lastMinuteSevice has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/last-minute-sevices")
    @Timed
    public ResponseEntity<LastMinuteSevice> createLastMinuteSevice(@RequestBody LastMinuteSevice lastMinuteSevice) throws URISyntaxException {
        log.debug("REST request to save LastMinuteSevice : {}", lastMinuteSevice);
        if (lastMinuteSevice.getId() != null) {
            throw new BadRequestAlertException("A new lastMinuteSevice cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LastMinuteSevice result = lastMinuteSeviceRepository.save(lastMinuteSevice);
        lastMinuteSeviceSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/last-minute-sevices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /last-minute-sevices : Updates an existing lastMinuteSevice.
     *
     * @param lastMinuteSevice the lastMinuteSevice to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lastMinuteSevice,
     * or with status 400 (Bad Request) if the lastMinuteSevice is not valid,
     * or with status 500 (Internal Server Error) if the lastMinuteSevice couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/last-minute-sevices")
    @Timed
    public ResponseEntity<LastMinuteSevice> updateLastMinuteSevice(@RequestBody LastMinuteSevice lastMinuteSevice) throws URISyntaxException {
        log.debug("REST request to update LastMinuteSevice : {}", lastMinuteSevice);
        if (lastMinuteSevice.getId() == null) {
            return createLastMinuteSevice(lastMinuteSevice);
        }
        LastMinuteSevice result = lastMinuteSeviceRepository.save(lastMinuteSevice);
        lastMinuteSeviceSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lastMinuteSevice.getId().toString()))
            .body(result);
    }

    /**
     * GET  /last-minute-sevices : get all the lastMinuteSevices.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of lastMinuteSevices in body
     */
    @GetMapping("/last-minute-sevices")
    @Timed
    public ResponseEntity<List<LastMinuteSevice>> getAllLastMinuteSevices(Pageable pageable) {
        log.debug("REST request to get a page of LastMinuteSevices");
        Page<LastMinuteSevice> page = lastMinuteSeviceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/last-minute-sevices");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /last-minute-sevices/:id : get the "id" lastMinuteSevice.
     *
     * @param id the id of the lastMinuteSevice to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lastMinuteSevice, or with status 404 (Not Found)
     */
    @GetMapping("/last-minute-sevices/{id}")
    @Timed
    public ResponseEntity<LastMinuteSevice> getLastMinuteSevice(@PathVariable Long id) {
        log.debug("REST request to get LastMinuteSevice : {}", id);
        LastMinuteSevice lastMinuteSevice = lastMinuteSeviceRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(lastMinuteSevice));
    }

    /**
     * DELETE  /last-minute-sevices/:id : delete the "id" lastMinuteSevice.
     *
     * @param id the id of the lastMinuteSevice to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/last-minute-sevices/{id}")
    @Timed
    public ResponseEntity<Void> deleteLastMinuteSevice(@PathVariable Long id) {
        log.debug("REST request to delete LastMinuteSevice : {}", id);
        lastMinuteSeviceRepository.delete(id);
        lastMinuteSeviceSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/last-minute-sevices?query=:query : search for the lastMinuteSevice corresponding
     * to the query.
     *
     * @param query the query of the lastMinuteSevice search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/last-minute-sevices")
    @Timed
    public ResponseEntity<List<LastMinuteSevice>> searchLastMinuteSevices(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of LastMinuteSevices for query {}", query);
        Page<LastMinuteSevice> page = lastMinuteSeviceSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/last-minute-sevices");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
