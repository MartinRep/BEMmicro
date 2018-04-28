package ie.gmit.bem.repository.search;

import ie.gmit.bem.domain.LastMinuteSevice;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LastMinuteSevice entity.
 */
public interface LastMinuteSeviceSearchRepository extends ElasticsearchRepository<LastMinuteSevice, Long> {
}
