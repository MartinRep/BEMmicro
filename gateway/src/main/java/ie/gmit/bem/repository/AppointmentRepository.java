package ie.gmit.bem.repository;

import ie.gmit.bem.domain.Appointment;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Appointment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    @Query("select distinct appointment from Appointment appointment left join fetch appointment.profiles left join fetch appointment.messages")
    List<Appointment> findAllWithEagerRelationships();

    @Query("select appointment from Appointment appointment left join fetch appointment.profiles left join fetch appointment.messages where appointment.id =:id")
    Appointment findOneWithEagerRelationships(@Param("id") Long id);

}
