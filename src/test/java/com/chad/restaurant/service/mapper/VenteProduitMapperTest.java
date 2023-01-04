package com.chad.restaurant.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class VenteProduitMapperTest {

    private VenteProduitMapper venteProduitMapper;

    @BeforeEach
    public void setUp() {
        venteProduitMapper = new VenteProduitMapperImpl();
    }
}
