package ie.gmit.bem.repository.search;

import ie.gmit.bem.domain.Offer;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Offer entity.
 */
public interface OfferSearchRepository extends ElasticsearchRepository<Offer, Long> {
}
