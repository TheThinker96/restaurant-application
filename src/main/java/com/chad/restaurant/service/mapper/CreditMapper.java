package com.chad.restaurant.service.mapper;

import com.chad.restaurant.domain.Credit;
import com.chad.restaurant.domain.UserAccount;
import com.chad.restaurant.service.dto.CreditDTO;
import com.chad.restaurant.service.dto.UserAccountDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Credit} and its DTO {@link CreditDTO}.
 */
@Mapper(componentModel = "spring")
public interface CreditMapper extends EntityMapper<CreditDTO, Credit> {
    @Mapping(target = "userAccount", source = "userAccount", qualifiedByName = "userAccountId")
    CreditDTO toDto(Credit s);

    @Named("userAccountId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserAccountDTO toDtoUserAccountId(UserAccount userAccount);
}
