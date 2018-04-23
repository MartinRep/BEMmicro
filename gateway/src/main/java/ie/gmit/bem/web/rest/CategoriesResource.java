package ie.gmit.bem.web.rest;

import com.codahale.metrics.annotation.Timed;
import ie.gmit.bem.domain.Categories;

import ie.gmit.bem.repository.CategoriesRepository;
import ie.gmit.bem.web.rest.errors.BadRequestAlertException;
import ie.gmit.bem.web.rest.util.HeaderUtil;
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

/**
 * REST controller for managing Categories.
 */
@RestController
@RequestMapping("/api")
public class CategoriesResource {

    private final Logger log = LoggerFactory.getLogger(CategoriesResource.class);

    private static final String ENTITY_NAME = "categories";

    private final CategoriesRepository categoriesRepository;

    public CategoriesResource(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    /**
     * POST  /categories : Create a new categories.
     *
     * @param categories the categories to create
     * @return the ResponseEntity with status 201 (Created) and with body the new categories, or with status 400 (Bad Request) if the categories has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/categories")
    @Timed
    public ResponseEntity<Categories> createCategories(@Valid @RequestBody Categories categories) throws URISyntaxException {
        log.debug("REST request to save Categories : {}", categories);
        if (categories.getId() != null) {
            throw new BadRequestAlertException("A new categories cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Categories result = categoriesRepository.save(categories);
        return ResponseEntity.created(new URI("/api/categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /categories : Updates an existing categories.
     *
     * @param categories the categories to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated categories,
     * or with status 400 (Bad Request) if the categories is not valid,
     * or with status 500 (Internal Server Error) if the categories couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/categories")
    @Timed
    public ResponseEntity<Categories> updateCategories(@Valid @RequestBody Categories categories) throws URISyntaxException {
        log.debug("REST request to update Categories : {}", categories);
        if (categories.getId() == null) {
            return createCategories(categories);
        }
        Categories result = categoriesRepository.save(categories);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, categories.getId().toString()))
            .body(result);
    }

    /**
     * GET  /categories : get all the categories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of categories in body
     */
    @GetMapping("/categories")
    @Timed
    public List<Categories> getAllCategories() {
        log.debug("REST request to get all Categories");
        return categoriesRepository.findAll();
        }

    /**
     * GET  /categories/:id : get the "id" categories.
     *
     * @param id the id of the categories to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the categories, or with status 404 (Not Found)
     */
    @GetMapping("/categories/{id}")
    @Timed
    public ResponseEntity<Categories> getCategories(@PathVariable Long id) {
        log.debug("REST request to get Categories : {}", id);
        Categories categories = categoriesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(categories));
    }

    /**
     * DELETE  /categories/:id : delete the "id" categories.
     *
     * @param id the id of the categories to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteCategories(@PathVariable Long id) {
        log.debug("REST request to delete Categories : {}", id);
        categoriesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
