package com.chad.restaurant.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.chad.restaurant.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VenteProduitDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VenteProduitDTO.class);
        VenteProduitDTO venteProduitDTO1 = new VenteProduitDTO();
        venteProduitDTO1.setId(1L);
        VenteProduitDTO venteProduitDTO2 = new VenteProduitDTO();
        assertThat(venteProduitDTO1).isNotEqualTo(venteProduitDTO2);
        venteProduitDTO2.setId(venteProduitDTO1.getId());
        assertThat(venteProduitDTO1).isEqualTo(venteProduitDTO2);
        venteProduitDTO2.setId(2L);
        assertThat(venteProduitDTO1).isNotEqualTo(venteProduitDTO2);
        venteProduitDTO1.setId(null);
        assertThat(venteProduitDTO1).isNotEqualTo(venteProduitDTO2);
    }
}
