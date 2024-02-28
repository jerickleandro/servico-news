import {
  Hasher,
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
} from "./db-add-account-protocols";
export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {
    this.hasher = hasher;
    this.addAccountRepository = addAccountRepository;
  }
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashPassword = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData, {
        password: hashPassword,
      })
    );
    return new Promise((resolve) => resolve(account));
  }
}
