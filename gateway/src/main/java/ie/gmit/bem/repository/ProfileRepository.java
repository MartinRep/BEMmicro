package ie.gmit.bem.repository;

import ie.gmit.bem.domain.Profile;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Profile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {

    @Query("select profile from Profile profile where profile.user.login = ?#{principal.username}")
    List<Profile> findByUserIsCurrentUser();
    @Query("select distinct profile from Profile profile left join fetch profile.appointments left join fetch profile.categories")
    List<Profile> findAllWithEagerRelationships();

    @Query("select profile from Profile profile left join fetch profile.appointments left join fetch profile.categories where profile.id =:id")
    Profile findOneWithEagerRelationships(@Param("id") Long id);

}
