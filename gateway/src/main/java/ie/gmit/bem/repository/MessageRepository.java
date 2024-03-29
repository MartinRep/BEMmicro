package ie.gmit.bem.repository;

import ie.gmit.bem.domain.Message;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Message entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("select distinct message from Message message left join fetch message.appointments")
    List<Message> findAllWithEagerRelationships();

    @Query("select message from Message message left join fetch message.appointments where message.id =:id")
    Message findOneWithEagerRelationships(@Param("id") Long id);

}
