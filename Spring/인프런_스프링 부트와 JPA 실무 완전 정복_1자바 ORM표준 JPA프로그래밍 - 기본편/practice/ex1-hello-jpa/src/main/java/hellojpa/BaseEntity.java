package hellojpa;

import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass
public abstract class BaseEntity {
    private String createdBy;
    private LocalDateTime createdDate;

    private String lastModifiedBy;
    private LocalDateTime lastModifiedDate;
}
