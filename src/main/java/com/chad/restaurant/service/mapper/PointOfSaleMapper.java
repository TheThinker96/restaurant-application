package com.chad.restaurant.service.mapper;

import com.chad.restaurant.domain.Entreprise;
import com.chad.restaurant.domain.PointOfSale;
import com.chad.restaurant.service.dto.EntrepriseDTO;
import com.chad.restaurant.service.dto.PointOfSaleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PointOfSale} and its DTO {@link PointOfSaleDTO}.
 */
@Mapper(componentModel = "spring")
public interface PointOfSaleMapper extends EntityMapper<PointOfSaleDTO, PointOfSale> {
    @Mapping(target = "entreprise", source = "entreprise", qualifiedByName = "entrepriseId")
    PointOfSaleDTO toDto(PointOfSale s);

    @Named("entrepriseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EntrepriseDTO toDtoEntrepriseId(Entreprise entreprise);
}
