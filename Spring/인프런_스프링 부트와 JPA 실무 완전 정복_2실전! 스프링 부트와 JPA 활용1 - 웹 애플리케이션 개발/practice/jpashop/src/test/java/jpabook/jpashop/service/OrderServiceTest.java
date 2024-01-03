package jpabook.jpashop.service;

import jakarta.persistence.EntityManager;
import jpabook.jpashop.domain.Address;
import jpabook.jpashop.domain.Member;
import jpabook.jpashop.domain.Order;
import jpabook.jpashop.domain.OrderStatus;
import jpabook.jpashop.domain.item.Book;
import jpabook.jpashop.domain.item.Item;
import jpabook.jpashop.repository.OrderRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class OrderServiceTest {
    @Autowired
    EntityManager em;
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderRepository orderRepository;

    @Test
    void 상품주문() throws Exception {
        //given
        Member member = new Member();
        member.setName("회원1");
        member.setAddress(new Address("서울", "강가","123-123"));
        em.persist(member);

        Item book = new Book();
        book.setName("시골 JPA");
        book.setPrice(10000);
        book.setStockQuntity(10);
        em.persist(book);

        int orderCount = 2;
        //when
        Long orderId = orderService.order(member.getId(), book.getId(), orderCount);

        //then
        Order getOrder = orderRepository.findOne(orderId);

        assertThat(getOrder.getStatus())
                .as("상품 주문시 상품 상태는 ORDER")
                .isEqualTo(OrderStatus.ORDER);

        assertThat(getOrder.getOrderItems().size())
                .as("주문한 상품 종류 수가 정화갷야 한다.")
                .isEqualTo(1);

        assertThat(getOrder.getTotalPrice())
                .as("주문 가격은 가격 * 수량이다.")
                .isEqualTo(book.getPrice() * orderCount);

        assertThat(book.getStockQuntity())
                .as("주문 수량만큼 재고가 줄어야한다.")
                .isEqualTo(8);
    }

    @Test
    void 상품주문_재고수량초과() throws Exception {
        //given

        //when

        //then
    }

    @Test
    void 주문취소() throws Exception {
        //given

        //when

        //then
    }

}
