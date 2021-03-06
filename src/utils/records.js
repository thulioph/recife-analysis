class Records {
    totalPaidValues(arr) {
        return arr.map((el) => Number(parseInt(el.valor_pago, 10))).reduce((a, b) => a + b, 0);
    }

    orderByMonth(arr) {
        return arr.sort((a, b) => a.mes_movimentacao - b.mes_movimentacao);
    }

    totalByViceMayor(arr) {
        return arr.filter((el) => el.orgao_codigo === '12');
    }

    totalByMayor(arr) {
        return arr.filter((el) => el.orgao_codigo === '10');
    }
}

export default Records;