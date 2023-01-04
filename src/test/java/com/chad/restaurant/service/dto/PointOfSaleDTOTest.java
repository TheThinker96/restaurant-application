package com.chad.restaurant.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.chad.restaurant.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PointOfSaleDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PointOfSaleDTO.class);
        PointOfSaleDTO pointOfSaleDTO1 = new PointOfSaleDTO();
        pointOfSaleDTO1.setId(1L);
        PointOfSaleDTO pointOfSaleDTO2 = new PointOfSaleDTO();
        assertThat(pointOfSaleDTO1).isNotEqualTo(pointOfSaleDTO2);
        pointOfSaleDTO2.setId(pointOfSaleDTO1.getId());
        assertThat(pointOfSaleDTO1).isEqualTo(pointOfSaleDTO2);
        pointOfSaleDTO2.setId(2L);
        assertThat(pointOfSaleDTO1).isNotEqualTo(pointOfSaleDTO2);
        pointOfSaleDTO1.setId(null);
        assertThat(pointOfSaleDTO1).isNotEqualTo(pointOfSaleDTO2);
    }
}
