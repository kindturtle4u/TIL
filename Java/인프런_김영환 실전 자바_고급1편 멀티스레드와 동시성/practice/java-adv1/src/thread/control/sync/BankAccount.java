package thread.control.sync;

public interface BankAccount {
    boolean withdraw(int amount);

    int getBalance();
}
