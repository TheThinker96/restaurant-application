package com.chad.restaurant.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CreditMapperTest {

    private CreditMapper creditMapper;

    @BeforeEach
    public void setUp() {
        creditMapper = new CreditMapperImpl();
    }
}
