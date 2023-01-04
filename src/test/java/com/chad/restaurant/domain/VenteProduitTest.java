package com.chad.restaurant.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.chad.restaurant.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VenteProduitTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VenteProduit.class);
        VenteProduit venteProduit1 = new VenteProduit();
        venteProduit1.setId(1L);
        VenteProduit venteProduit2 = new VenteProduit();
        venteProduit2.setId(venteProduit1.getId());
        assertThat(venteProduit1).isEqualTo(venteProduit2);
        venteProduit2.setId(2L);
        assertThat(venteProduit1).isNotEqualTo(venteProduit2);
        venteProduit1.setId(null);
        assertThat(venteProduit1).isNotEqualTo(venteProduit2);
    }
}
