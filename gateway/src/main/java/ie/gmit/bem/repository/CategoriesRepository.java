package ie.gmit.bem.repository;

import ie.gmit.bem.domain.Categories;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Categories entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoriesRepository extends JpaRepository<Categories, Long> {

}
