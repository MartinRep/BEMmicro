package ie.gmit.bem.repository.search;

import ie.gmit.bem.domain.LastMinuteService;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LastMinuteService entity.
 */
public interface LastMinuteServiceSearchRepository extends ElasticsearchRepository<LastMinuteService, Long> {
}
