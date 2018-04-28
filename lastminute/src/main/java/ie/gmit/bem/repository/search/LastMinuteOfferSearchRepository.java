package ie.gmit.bem.repository.search;

import ie.gmit.bem.domain.LastMinuteOffer;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LastMinuteOffer entity.
 */
public interface LastMinuteOfferSearchRepository extends ElasticsearchRepository<LastMinuteOffer, Long> {
}
