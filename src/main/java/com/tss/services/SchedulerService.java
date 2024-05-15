
package com.tss.services;

import com.tss.entities.Product;
import com.tss.repositories.ProductRepository;
import java.math.BigDecimal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component
public class SchedulerService {
    
    java.util.Random randomizer = new java.util.Random();
    
    @Autowired
    private ProductRepository productRepository;
    //Wywoływanie operacji co 2000 milisekund
    @Scheduled(fixedDelay = 2000)
    public void databaseUpdate() {
        
        java.util.List<Product> products = productRepository.findAll();
        
        for(Product product:products) {
            BigDecimal newValue = product.getPrice().
                    add(new BigDecimal(randomizer.nextInt(10)-5));
            if(newValue.compareTo(BigDecimal.ZERO) <0)
                newValue=BigDecimal.ZERO;
            product.setPrice(newValue);
            product.setUpdated(new java.util.Date());
        }
        productRepository.saveAll(products);
    }
    
}
