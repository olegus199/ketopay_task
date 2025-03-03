# KETOPAY TASK

Для выполненя задания, мне пришлось использовать [newsapi](https://newsapi.org/), так как использование nytimes выдавало ошибку **429 Too Many Requests**
```bash
{
    "fault": {
        "faultstring": "Rate limit quota violation. Quota limit  exceeded. Identifier : 05068431-68a2-45cf-a4b4-69fac11cb2ac",
        "detail": {
            "errorcode": "policies.ratelimit.QuotaViolation"
        }
    }
}
````

Начал имплементировать базовые тесты
