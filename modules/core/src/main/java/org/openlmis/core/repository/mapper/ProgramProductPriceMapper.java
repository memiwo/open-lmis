package org.openlmis.core.repository.mapper;

import org.apache.ibatis.annotations.*;
import org.openlmis.core.domain.ProgramProductPrice;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramProductPriceMapper {
  @Insert({"INSERT INTO program_product_price_history",
      "(programProductId, price, pricePerDosage, source, endDate, modifiedBy) VALUES",
      "(#{programProduct.id}, #{programProduct.currentPrice}, #{pricePerDosage}, #{source}, #{endDate}, #{modifiedBy})"})
  @Options(useGeneratedKeys = true)
  void insertNewCurrentPrice(ProgramProductPrice programProductPrice);

  @Update({"UPDATE program_product_price_history SET endDate = DEFAULT, modifiedBy = #{modifiedBy}, modifiedDate = DEFAULT where programProductId = #{programProduct.id} AND endDate IS NULL"})
  void closeLastActivePrice(ProgramProductPrice programProductPrice);

  @Select({"SELECT * FROM program_product_price_history where id = #{id}"})
  @Results({@Result(property = "programProduct.id", column = "programProductId"),
      @Result(property = "programProduct.currentPrice", column = "price")})
  ProgramProductPrice getById(Integer id);
}
