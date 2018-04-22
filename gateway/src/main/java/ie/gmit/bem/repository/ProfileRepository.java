package ie.gmit.bem.repository;

import ie.gmit.bem.domain.Profile;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Profile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {

    @Query("select profile from Profile profile where profile.user.login = ?#{principal.username}")
    List<Profile> findByUserIsCurrentUser();

}
