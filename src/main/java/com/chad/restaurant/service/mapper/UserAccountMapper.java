package com.chad.restaurant.service.mapper;

import com.chad.restaurant.domain.Entreprise;
import com.chad.restaurant.domain.PointOfSale;
import com.chad.restaurant.domain.UserAccount;
import com.chad.restaurant.service.dto.EntrepriseDTO;
import com.chad.restaurant.service.dto.PointOfSaleDTO;
import com.chad.restaurant.service.dto.UserAccountDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserAccount} and its DTO {@link UserAccountDTO}.
 */
@Mapper(componentModel = "spring")
public interface UserAccountMapper extends EntityMapper<UserAccountDTO, UserAccount> {
    @Mapping(target = "entreprise", source = "entreprise", qualifiedByName = "entrepriseId")
    @Mapping(target = "pointOfSale", source = "pointOfSale", qualifiedByName = "pointOfSaleId")
    UserAccountDTO toDto(UserAccount s);

    @Named("entrepriseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EntrepriseDTO toDtoEntrepriseId(Entreprise entreprise);

    @Named("pointOfSaleId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    PointOfSaleDTO toDtoPointOfSaleId(PointOfSale pointOfSale);
}
