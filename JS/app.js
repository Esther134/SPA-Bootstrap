// Array com dados temporários
const chamados = [
    { id: 1, titulo: "Computador não liga", descricao: "O computador não apresenta sinal de energia.", prioridade: "Alta", status: "Aberto" },
    { id: 2, titulo: "Senha bloqueada", descricao: "Usuário não consegue acessar o sistema.", prioridade: "Média", status: "Em atendimento" },
    { id: 3, titulo: "Notebook não liga", descricao: "O computador não apresenta sinal de energia.", prioridade: "Alta", status: "Encerrado", solucao: "Troca da fonte de alimentação." }
];

const prioridadesDisponiveis = ["Baixa", "Média", "Alta"];
const app = document.getElementById("app");

// Funções auxiliares para renderização de Badges
function obterBadgePrioridade(prioridade) {
    if (prioridade === "Alta") return '<span class="badge bg-danger piscar-alta px-2 py-1 rounded-pill">Alta</span>';
    if (prioridade === "Média") return '<span class="badge bg-warning text-dark px-2 py-1 rounded-pill">Média</span>';
    return '<span class="badge bg-success px-2 py-1 rounded-pill">Baixa</span>';
}

function obterBadgeStatus(status) {
    if (status === "Aberto") return '<span class="badge bg-primary px-2 py-1 rounded-pill">Aberto</span>';
    if (status === "Em atendimento") return '<span class="badge bg-info text-dark px-2 py-1 rounded-pill">Em atendimento</span>';
    return '<span class="badge bg-secondary px-2 py-1 rounded-pill">Encerrado</span>';
}

function mostrarDashboard() {
    const abertos = chamados.filter(c => c.status === "Aberto").length;
    const emAtendimento = chamados.filter(c => c.status === "Em atendimento").length;
    const encerrados = chamados.filter(c => c.status === "Encerrado").length;
    const prioridadeAlta = chamados.filter(c => c.prioridade === "Alta").length;

    app.innerHTML = `
        <div class="fade-in">
            <h2 class="mb-4 fw-bold text-dark"><i class="bi bi-speedometer2 text-primary me-2"></i>Visão Geral</h2>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="card card-dashboard">
                        <div class="card-body d-flex align-items-center">
                            <div class="bg-light rounded p-3 me-3 text-secondary"><i class="bi bi-collection fs-3"></i></div>
                            <div><h6 class="mb-0 text-muted">Total de chamados</h6><h3 class="mb-0 fw-bold">${chamados.length}</h3></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card card-dashboard border-bottom border-primary border-3">
                        <div class="card-body d-flex align-items-center">
                            <div class="bg-primary bg-opacity-10 rounded p-3 me-3 text-primary"><i class="bi bi-inbox fs-3"></i></div>
                            <div><h6 class="mb-0 text-muted">Abertos</h6><h3 class="mb-0 fw-bold text-primary">${abertos}</h3></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card card-dashboard border-bottom border-info border-3">
                        <div class="card-body d-flex align-items-center">
                            <div class="bg-info bg-opacity-10 rounded p-3 me-3 text-info"><i class="bi bi-arrow-repeat fs-3"></i></div>
                            <div><h6 class="mb-0 text-muted">Em atendimento</h6><h3 class="mb-0 fw-bold text-info">${emAtendimento}</h3></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-dashboard border-bottom border-secondary border-3">
                        <div class="card-body d-flex align-items-center">
                            <div class="bg-secondary bg-opacity-10 rounded p-3 me-3 text-secondary"><i class="bi bi-check2-circle fs-3"></i></div>
                            <div><h6 class="mb-0 text-muted">Encerrados</h6><h3 class="mb-0 fw-bold text-secondary">${encerrados}</h3></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-dashboard border-bottom border-danger border-3">
                        <div class="card-body d-flex align-items-center">
                            <div class="bg-danger bg-opacity-10 rounded p-3 me-3 text-danger"><i class="bi bi-exclamation-triangle fs-3"></i></div>
                            <div><h6 class="mb-0 text-muted">Prioridade Alta</h6><h3 class="mb-0 fw-bold text-danger">${prioridadeAlta}</h3></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function mostrarChamados() {
    app.innerHTML = `
        <div class="fade-in">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="fw-bold text-dark mb-0"><i class="bi bi-list-task text-primary me-2"></i>Lista de Chamados</h2>
            </div>
            <div class="content-box table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead>
                        <tr>
                            <th>ID</th><th>Título</th><th>Prioridade</th><th>Status</th><th class="text-end">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${chamados.map(chamado => `
                            <tr>
                                <td class="fw-bold text-muted">#${chamado.id}</td>
                                <td>${chamado.titulo}</td>
                                <td>${obterBadgePrioridade(chamado.prioridade)}</td>
                                <td>${obterBadgeStatus(chamado.status)}</td>
                                <td class="text-end">
                                    <button class="btn btn-sm btn-outline-primary rounded-pill me-1" onclick="mostrarVisualizar(${chamado.id})">
                                        <i class="bi bi-eye"></i> Ver
                                    </button>
                                    ${chamado.status !== "Encerrado" ? `
                                    <button class="btn btn-sm btn-success rounded-pill" onclick="mostrarEncerrar(${chamado.id})">
                                        <i class="bi bi-check-lg"></i> Encerrar
                                    </button>` : ""}
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function mostrarNovoChamado() {
    const opcoesPrioridade = prioridadesDisponiveis.map(p => `<option value="${p}">${p}</option>`).join("");

    app.innerHTML = `
        <div class="fade-in row justify-content-center">
            <div class="col-lg-8">
                <h2 class="fw-bold text-dark mb-4"><i class="bi bi-plus-circle text-primary me-2"></i>Abertura de Chamado</h2>
                <div class="content-box">
                    <form id="formChamado">
                        <div class="mb-4">
                            <label class="form-label fw-semibold" for="titulo">Resumo do Problema</label>
                            <input class="form-control form-control-lg bg-light border-0" id="titulo" placeholder="Ex: Computador não liga" required>
                        </div>
                        <div class="mb-4">
                            <label class="form-label fw-semibold" for="descricao">Descrição Detalhada</label>
                            <textarea class="form-control bg-light border-0" id="descricao" rows="4" placeholder="Informe todos os detalhes possíveis..." required></textarea>
                        </div>
                        <div class="mb-4">
                            <label class="form-label fw-semibold" for="prioridade">Prioridade de Atendimento</label>
                            <select class="form-select form-select-lg bg-light border-0" id="prioridade" required>
                                <option value="">Selecione uma classificação</option>
                                ${opcoesPrioridade}
                            </select>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button class="btn btn-light px-4 me-md-2" type="button" onclick="mostrarChamados()">Cancelar</button>
                            <button class="btn btn-primary px-4 shadow-sm" type="submit"><i class="bi bi-send me-2"></i>Registrar Chamado</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.getElementById("formChamado").addEventListener("submit", cadastrarChamado);
}

function cadastrarChamado(evento) {
    evento.preventDefault();
    chamados.push({
        id: chamados.length + 1,
        titulo: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        prioridade: document.getElementById("prioridade").value,
        status: "Aberto"
    });
    mostrarChamados();
}

function mostrarVisualizar(id) {
    const chamado = chamados.find(c => c.id === id);
    app.innerHTML = `
        <div class="fade-in row justify-content-center">
            <div class="col-lg-8">
                <h2 class="fw-bold text-dark mb-4">Detalhes do Chamado <span class="text-primary">#${chamado.id}</span></h2>
                <div class="content-box mb-4">
                    <h4 class="fw-bold mb-3">${chamado.titulo}</h4>
                    <div class="d-flex gap-3 mb-4 border-bottom pb-3">
                        <div><small class="text-muted d-block">Prioridade</small>${obterBadgePrioridade(chamado.prioridade)}</div>
                        <div><small class="text-muted d-block">Status</small>${obterBadgeStatus(chamado.status)}</div>
                    </div>
                    <div class="mb-4">
                        <h6 class="text-muted fw-bold">DESCRIÇÃO DO PROBLEMA</h6>
                        <p class="text-dark bg-light p-3 rounded">${chamado.descricao}</p>
                    </div>
                    ${chamado.status === "Encerrado" ? `
                    <div>
                        <h6 class="text-success fw-bold"><i class="bi bi-tools me-1"></i> SOLUÇÃO APLICADA</h6>
                        <p class="text-dark border border-success border-opacity-25 bg-success bg-opacity-10 p-3 rounded">${chamado.solucao}</p>
                    </div>` : ""}
                </div>
                <button class="btn btn-outline-secondary px-4" onclick="mostrarChamados()"><i class="bi bi-arrow-left me-2"></i>Voltar para Lista</button>
            </div>
        </div>
    `;
}

function mostrarEncerrar(id) {
    const chamado = chamados.find(c => c.id === id);
    app.innerHTML = `
        <div class="fade-in row justify-content-center">
            <div class="col-lg-8">
                <h2 class="fw-bold text-dark mb-4"><i class="bi bi-check-circle text-success me-2"></i>Encerrar Chamado #${chamado.id}</h2>
                
                <div class="alert alert-primary border-0 shadow-sm mb-4">
                    <h5 class="alert-heading fw-bold">${chamado.titulo}</h5>
                    <p class="mb-2">${chamado.descricao}</p>
                    <hr>
                    <p class="mb-0">
                        Prioridade: ${obterBadgePrioridade(chamado.prioridade)} 
                        <span class="mx-2">|</span> 
                        Status: ${obterBadgeStatus(chamado.status)}
                    </p>
                </div>

                <div class="content-box">
                    <form id="formEncerrar">
                        <div class="mb-4">
                            <label class="form-label fw-bold text-dark" for="solucao">Registro de Solução (Obrigatório)</label>
                            <textarea class="form-control bg-light border-0" id="solucao" rows="5" placeholder="Descreva tecnicamente os procedimentos realizados para resolver o incidente..."></textarea>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button class="btn btn-light px-4 me-md-2" type="button" onclick="mostrarChamados()">Cancelar</button>
                            <button class="btn btn-success px-4 shadow-sm" type="submit"><i class="bi bi-check2-all me-2"></i>Confirmar Encerramento</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.getElementById("formEncerrar").addEventListener("submit", evento => {
        evento.preventDefault();
        const solucao = document.getElementById("solucao").value.trim();
        
        if (!solucao) {
            alert("Atenção: O preenchimento do campo de registro de solução é obrigatório para encerrar o chamado.");
            return;
        }

        chamado.solucao = solucao;
        chamado.status = "Encerrado";
        mostrarChamados();
    });
}

// Roteamento da SPA
const links = document.querySelectorAll("[data-view]");
links.forEach(link => {
    link.addEventListener("click", evento => {
        evento.preventDefault();
        const view = link.dataset.view;
        if (view === "dashboard") mostrarDashboard();
        if (view === "chamados") mostrarChamados();
        if (view === "novo") mostrarNovoChamado();
    });
});

// Inicialização
mostrarDashboard();