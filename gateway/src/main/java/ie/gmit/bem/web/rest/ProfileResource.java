package ie.gmit.bem.web.rest;

import com.codahale.metrics.annotation.Timed;
import ie.gmit.bem.domain.Profile;

import ie.gmit.bem.repository.ProfileRepository;
import ie.gmit.bem.repository.search.ProfileSearchRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Profile.
 */
@RestController
@RequestMapping("/api")
public class ProfileResource {

    private final Logger log = LoggerFactory.getLogger(ProfileResource.class);

    private static final String ENTITY_NAME = "profile";

    private final ProfileRepository profileRepository;

    private final ProfileSearchRepository profileSearchRepository;

    public ProfileResource(ProfileRepository profileRepository, ProfileSearchRepository profileSearchRepository) {
        this.profileRepository = profileRepository;
        this.profileSearchRepository = profileSearchRepository;
    }

    /**
     * POST  /profiles : Create a new profile.
     *
     * @param profile the profile to create
     * @return the ResponseEntity with status 201 (Created) and with body the new profile, or with status 400 (Bad Request) if the profile has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/profiles")
    @Timed
    public ResponseEntity<Profile> createProfile(@RequestBody Profile profile) throws URISyntaxException {
        log.debug("REST request to save Profile : {}", profile);
        if (profile.getId() != null) {
            throw new BadRequestAlertException("A new profile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Profile result = profileRepository.save(profile);
        profileSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/profiles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /profiles : Updates an existing profile.
     *
     * @param profile the profile to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated profile,
     * or with status 400 (Bad Request) if the profile is not valid,
     * or with status 500 (Internal Server Error) if the profile couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/profiles")
    @Timed
    public ResponseEntity<Profile> updateProfile(@RequestBody Profile profile) throws URISyntaxException {
        log.debug("REST request to update Profile : {}", profile);
        if (profile.getId() == null) {
            return createProfile(profile);
        }
        Profile result = profileRepository.save(profile);
        profileSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, profile.getId().toString()))
            .body(result);
    }

    /**
     * GET  /profiles : get all the profiles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of profiles in body
     */
    @GetMapping("/profiles")
    @Timed
    public List<Profile> getAllProfiles() {
        log.debug("REST request to get all Profiles");
        return profileRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /profiles/:id : get the "id" profile.
     *
     * @param id the id of the profile to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the profile, or with status 404 (Not Found)
     */
    @GetMapping("/profiles/{id}")
    @Timed
    public ResponseEntity<Profile> getProfile(@PathVariable Long id) {
        log.debug("REST request to get Profile : {}", id);
        Profile profile = profileRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(profile));
    }

    /**
     * DELETE  /profiles/:id : delete the "id" profile.
     *
     * @param id the id of the profile to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/profiles/{id}")
    @Timed
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        log.debug("REST request to delete Profile : {}", id);
        profileRepository.delete(id);
        profileSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/profiles?query=:query : search for the profile corresponding
     * to the query.
     *
     * @param query the query of the profile search
     * @return the result of the search
     */
    @GetMapping("/_search/profiles")
    @Timed
    public List<Profile> searchProfiles(@RequestParam String query) {
        log.debug("REST request to search Profiles for query {}", query);
        return StreamSupport
            .stream(profileSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
