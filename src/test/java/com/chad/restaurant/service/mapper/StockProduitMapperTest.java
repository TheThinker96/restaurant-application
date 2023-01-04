package com.chad.restaurant.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StockProduitMapperTest {

    private StockProduitMapper stockProduitMapper;

    @BeforeEach
    public void setUp() {
        stockProduitMapper = new StockProduitMapperImpl();
    }
}
