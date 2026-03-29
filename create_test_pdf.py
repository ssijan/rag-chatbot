from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font("Helvetica", style="B", size=16)
        self.cell(0, 10, "Operational Manual - XYZ Company", align="C")
        self.ln(15)

pdf = PDF()
pdf.set_margins(20, 20, 20)
pdf.add_page()

content = [
    ("1. Company Overview",
     "XYZ Company was founded in 2010 by CEO Mr. John Smith and specializes in software solutions. "
     "We have over 500 employees across 10 offices worldwide. Our headquarters is located in New York, USA. "
     "The company vision is to deliver world class software products to enterprise clients globally. "
     "XYZ Company went public in 2018 and is listed on NASDAQ under the ticker symbol XYZC. "
     "Annual revenue for 2023 was reported at 120 million USD."),

    ("2. Working Hours",
     "Office hours are Monday to Friday, 9:00 AM to 6:00 PM local time. "
     "Employees are expected to be available during core hours of 10:00 AM to 4:00 PM. "
     "Remote work is allowed up to 3 days per week with manager approval. "
     "Overtime work must be pre-approved by the department head. "
     "Employees working more than 2 hours overtime will receive 1.5x their hourly rate. "
     "Night shift employees working between 10:00 PM and 6:00 AM receive an additional 20% night allowance."),

    ("3. Leave Policy",
     "Employees are entitled to 20 days of annual leave per year. "
     "Sick leave is 10 days per year with a valid medical certificate required after 3 consecutive days. "
     "Maternity leave is 6 months paid for full time employees. "
     "Paternity leave is 2 weeks paid. "
     "Emergency leave is 3 days per year for immediate family matters. "
     "Unpaid leave may be granted at the discretion of HR for up to 30 days per year. "
     "Leave must be applied for at least 2 weeks in advance except for emergency leave."),

    ("4. Code of Conduct",
     "All employees must maintain professional behavior at all times inside and outside the office. "
     "Harassment of any kind including verbal, physical, or digital is strictly prohibited and will result in immediate termination. "
     "Employees must dress in business casual attire from Monday to Thursday. Fridays are casual dress days. "
     "Use of mobile phones during client meetings is not permitted. "
     "Employees must not speak negatively about the company or colleagues on social media. "
     "Conflicts of interest must be disclosed to HR immediately. "
     "Accepting gifts worth more than 50 USD from clients or vendors is prohibited."),

    ("5. IT Policy",
     "Company laptops must not be used for personal activities or entertainment. "
     "All data must be stored on company approved cloud storage only. Personal USB drives are not permitted. "
     "Employees must use a VPN when working remotely or from public networks. "
     "Passwords must be at least 12 characters long and changed every 90 days. "
     "Installing unauthorized software on company devices is strictly prohibited. "
     "All company devices must have antivirus software enabled at all times. "
     "Lost or stolen devices must be reported to IT within 2 hours of discovery."),

    ("6. Salary and Benefits",
     "Salaries are paid on the last working day of each month via direct bank transfer. "
     "Health insurance is provided for all full time employees and their immediate dependents. "
     "Employees receive an annual performance bonus of up to 15% of their base salary. "
     "The company provides a provident fund contribution of 10% of basic salary. "
     "Employees are eligible for a yearly salary increment of 5 to 10 percent based on performance review. "
     "Transportation allowance of 200 USD per month is provided for employees without company vehicles. "
     "Meal allowance of 10 USD per working day is provided for all employees."),

    ("7. Performance Review",
     "Performance reviews are conducted twice a year in June and December. "
     "Each employee is evaluated by their direct manager using the KPI framework. "
     "Employees scoring below 60% in two consecutive reviews may face a performance improvement plan. "
     "Top performers scoring above 90% are eligible for fast track promotion. "
     "360 degree feedback is collected from peers, subordinates, and managers. "
     "Performance review results directly impact annual bonus and salary increment decisions."),

    ("8. Training and Development",
     "XYZ Company allocates a training budget of 1500 USD per employee per year. "
     "Employees are encouraged to complete at least 40 hours of training annually. "
     "The company provides access to online learning platforms including Coursera and Udemy. "
     "Leadership training programs are available for senior employees above grade 7. "
     "Employees who complete company sponsored certifications receive a one time bonus of 500 USD. "
     "New employees must complete a 2 week onboarding program before starting their regular duties."),

    ("9. Disciplinary Policy",
     "Minor violations result in a written warning which remains on record for 12 months. "
     "Three written warnings within 12 months will result in termination. "
     "Major violations such as fraud, theft, or harassment result in immediate termination without notice. "
     "Employees have the right to appeal any disciplinary action within 7 days. "
     "An independent HR committee reviews all termination decisions before they are finalized. "
     "Employees under disciplinary investigation are placed on paid administrative leave."),

    ("10. Health and Safety",
     "All offices are equipped with first aid kits and fire extinguishers. "
     "Fire drills are conducted every 6 months in all office locations. "
     "Employees must report any workplace hazards to the facilities team within 24 hours. "
     "The company provides annual health checkups for all employees at no cost. "
     "Mental health support is available through the Employee Assistance Program. "
     "Smoking is strictly prohibited inside all company premises including parking areas."),
]

for title, body in content:
    pdf.set_font("Helvetica", style="B", size=13)
    pdf.multi_cell(0, 10, title)
    pdf.ln(2)
    pdf.set_font("Helvetica", size=11)
    pdf.multi_cell(0, 8, body)
    pdf.ln(8)

pdf.output("documents/Operational_Manual_XYZ_Company.pdf")
print("Big PDF created successfully!")