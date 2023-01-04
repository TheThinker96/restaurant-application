package com.chad.restaurant.service.mapper;

import com.chad.restaurant.domain.Entreprise;
import com.chad.restaurant.service.dto.EntrepriseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Entreprise} and its DTO {@link EntrepriseDTO}.
 */
@Mapper(componentModel = "spring")
public interface EntrepriseMapper extends EntityMapper<EntrepriseDTO, Entreprise> {}
