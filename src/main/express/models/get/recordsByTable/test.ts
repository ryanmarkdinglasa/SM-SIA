import Store from '../../../../Store'

( async () => {

    const state:any = Store.getStore();
    console.log(state.databaseManager.manager.activeDatabaseConfig);
})()