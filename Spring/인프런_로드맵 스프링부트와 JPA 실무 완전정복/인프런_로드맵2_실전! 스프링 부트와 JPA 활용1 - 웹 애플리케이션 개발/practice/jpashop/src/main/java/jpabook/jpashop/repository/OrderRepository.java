package jpabook.jpashop.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import jpabook.jpashop.domain.Member;
import jpabook.jpashop.domain.Order;
import jpabook.jpashop.domain.OrderStatus;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

import static jpabook.jpashop.domain.QMember.member;
import static jpabook.jpashop.domain.QOrder.order;

@Repository
public class OrderRepository {
    private final EntityManager em;
    private final JPAQueryFactory query;

    public OrderRepository(EntityManager em) {
        this.em = em;
        this.query = new JPAQueryFactory(em);
    }

    public void save(Order order) {
        em.persist(order);
    }

    public Order findOne(Long id) {
        return em.find(Order.class, id);
    }

    public List<Order> findAll2(OrderSearch orderSearch) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Order> cq = cb.createQuery(Order.class);
        Root<Order> o = cq.from(Order.class);
        Join<Order, Member> m = o.join("member", JoinType.INNER); //회원과 조인

        List<Predicate> criteria = new ArrayList<>();

        //주문 상태 검색
        if (orderSearch.getOrderStatus() != null) {
            Predicate status = cb.equal(o.get("status"),
                    orderSearch.getOrderStatus());
            criteria.add(status);
        }

        //회원 이름 검색
        if (StringUtils.hasText(orderSearch.getMemberName())) {
            Predicate name =
                    cb.like(m.<String>get("name"), "%" +
                            orderSearch.getMemberName() + "%");
            criteria.add(name);
        }

        cq.where(cb.and(criteria.toArray(new Predicate[criteria.size()])));
        TypedQuery<Order> query = em.createQuery(cq).setMaxResults(1000); //최대 1000건

        return query.getResultList();
    }

    public List<Order> findAll(OrderSearch orderSearch) {
        return query.select(order)
                .from(order)
                .join(order.member, member)
                .where(statusEq(orderSearch.getOrderStatus()), nameLike(orderSearch))
                .limit(1000)
                .fetch();
    }

    private static BooleanExpression nameLike(OrderSearch orderSearch) {
        if (!StringUtils.hasText(orderSearch.getMemberName())) {
            return null;
        }

        return member.name.like(orderSearch.getMemberName());
    }

    private BooleanExpression statusEq(OrderStatus statusCond) {
        if (statusCond == null) return null;

        return order.status.eq(statusCond);
    }

    private BooleanExpression statusEq2(OrderStatus statusCond) {
        if (statusCond == null) return null;

        return order.status.eq(statusCond);
    }


    public List<Order> findAllWithMemberDelivery(OrderSearch orderSearch) {
        return em.createQuery("""
                                select o from Order o 
                                         join fetch o.member m
                                         join fetch o.delivery d                  
                        """, Order.class)
                .getResultList();
    }

    public List<OrderSimpleQueryDto> findOrderDtos() {
        return em.createQuery("""
                        select new jpabook.jpashop.repository.OrderSimpleQueryDto(
                                            o.id, m.name, o.orderDate, o.status, d.address) 
                        from Order o
                        join o.member m
                        join o.delivery d
                        """, OrderSimpleQueryDto.class)
                .getResultList();

    }

    public List<Order> findAllWithItem(OrderSearch orderSearch) {
        return em.createQuery("""
                select distinct o
                from Order o
                join fetch o.member
                join fetch o.delivery
                join fetch o.orderItems oi
                join fetch oi.item
                """, Order.class)
                .getResultList();
    }

    public List<Order> findAllWithMemberDelivery(int offset, int limit) {
        return em.createQuery("""
                                select o from Order o 
                                         join fetch o.member m
                                         join fetch o.delivery d                  
                        """, Order.class)
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
    }
}
